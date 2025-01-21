"use client";

import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { TVerificationSchema, VerificationSchema } from "./validSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useResendOtpMutation, useVerificationEmailMutation } from "@/queries";
import { useAuthStore } from "@/stores";
import { useMessage } from "@/hooks/useMessage";
import { IApiErrorResponse, ISendOtp, IVerificationEmail } from "@/interfaces";
import { useRouter } from "next/navigation";
import { PATHNAME } from "@/configs";
import { MapperUser } from "@/mapping/user.mapping";
import useRedirect from "@/hooks/useRedirect";

const VerificationForm = () => {
  const [resendCountdown, setResendCountdown] = useState<number>(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const { mutateAsync, isPending } = useVerificationEmailMutation();
  const { mutateAsync: mutateAsyncResendOtp } = useResendOtpMutation();
  const { setUserInfo } = useAuthStore();
  const message = useMessage();
  const { push } = useRouter();
  const { onRedirect } = useRedirect();

  const form = useForm<TVerificationSchema>({
    resolver: zodResolver(VerificationSchema),
    defaultValues: {
      pin: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = useCallback(
    (data: { pin: string }) => {
      const email = useAuthStore.getState().userInfo?.email;
      if (!email) {
        message.error("Oops! Something went wrong");
        push(PATHNAME.SIGN_IN);
        return;
      }
      const value: IVerificationEmail = {
        email,
        otp: data.pin,
      };
      mutateAsync(value, {
        onSuccess: (res) => {
          if (res && res?.data) {
            const { ...userInfo } = res.data;
            setUserInfo(MapperUser(userInfo));
            onRedirect(userInfo);
            return;
          }
        },
        onError: (err) => {
          message.error(err?.message);
        },
      });
    },
    [mutateAsync, message, push, setUserInfo, onRedirect]
  );

  const handleResend = useCallback(() => {
    const email = useAuthStore.getState().userInfo?.email;
    if (!email) {
      message.error("Oops! Something went wrong");
      push(PATHNAME.SIGN_IN);
      return;
    }
    const value: ISendOtp = { email };
    mutateAsyncResendOtp(value, {
      onSuccess: (res) => {
        if (res) {
          message.success("Please check your email");
          if (resendCountdown === 0) {
            setResendCountdown(60);
            timer.current = setInterval(() => {
              setResendCountdown((prev) => {
                if (prev === 1 && timer.current) {
                  clearInterval(timer.current);
                  timer.current = null;
                }
                return prev - 1;
              });
            }, 1000);
          }
        }
      },
      onError: (err: IApiErrorResponse) => {
        message.error(err?.message);
      },
    });
  }, [message, mutateAsyncResendOtp, push, resendCountdown]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-10"
      >
        <div className="flex flex-col gap-4 justify-center mt-4">
          <span className="w-[247px] h-[40px] text-sm text-lightGray">
            Please type the verification code sent to {""} your email
          </span>
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP
                    maxLength={4}
                    {...field}
                    pattern={REGEXP_ONLY_DIGITS}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage className="!mt-[4px] px-1 text-[12px] font-normal text-[#ff402e]" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-10 text-center">
          <span className="flex justify-center gap-1 text-sm text-[#9E9E9F]">
            {resendCountdown > 0
              ? `Please check your email !`
              : `I don’t receive a code!`}
            <button
              className="text-primary underline"
              onClick={handleResend}
              disabled={resendCountdown > 0}
            >
              {resendCountdown > 0
                ? `Please wait ${resendCountdown}s`
                : "Please resend"}
            </button>
          </span>
          <Button
            size={"lg"}
            loading={isPending}
            disabled={isPending}
            className="m-auto mt-2 rounded-[40px] hover:bg-primary shadow-primaryBtnShadow"
          >
            Verify
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default VerificationForm;
