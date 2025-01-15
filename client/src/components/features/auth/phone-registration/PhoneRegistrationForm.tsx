"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/ui/phone-input";
import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";
import { usePhoneRegisterMutation } from "@/queries";
import { useAuthStore } from "@/stores";
import { useMessage } from "@/hooks/useMessage";
import { IPhoneRegister } from "@/interfaces";
import { PATHNAME } from "@/configs";
import { useRouter } from "next/navigation";
import { MapperUser } from "@/mapping/user.mapping";
import useRedirect from "@/hooks/useRedirect";

const PhoneRegistrationSchema = z.object({
  phone: z
    .string()
    .min(1, { message: "Phone number is required" })
    .refine((phone) => isValidPhoneNumber(phone), {
      message: "Invalid phone number",
    }),
});

type TPhoneRegistrationSchema = z.infer<typeof PhoneRegistrationSchema>;

const PhoneRegistrationForm = () => {
  const form = useForm<TPhoneRegistrationSchema>({
    resolver: zodResolver(PhoneRegistrationSchema),
    defaultValues: {
      phone: "",
    },
    mode: "all",
  });

  const { mutateAsync, isPending } = usePhoneRegisterMutation();
  const { setUserInfo } = useAuthStore();
  const message = useMessage();
  const { push } = useRouter();
  const { onRedirect } = useRedirect();

  const onSubmit = useCallback(
    (data: { phone: string }) => {
      const email = useAuthStore.getState().userInfo?.email;
      if (!email) {
        message.error("Oops! Something went wrong");
        push(PATHNAME.SIGN_IN);
        return;
      }
      const value: IPhoneRegister = {
        email,
        phoneNumber: data.phone,
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PhoneInput
                  defaultCountry="VN"
                  placeholder="Enter a phone number"
                  {...field}
                />
              </FormControl>
              <FormMessage className="!mt-[4px] px-1 text-[12px] font-normal text-[#ff402e]" />
            </FormItem>
          )}
        />
        <div className="w-full text-center">
          <Button
            size={"lg"}
            loading={isPending}
            disabled={isPending}
            className="m-auto mt-2 rounded-[40px] hover:bg-primary shadow-primaryBtnShadow"
          >
            SEND
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PhoneRegistrationForm;
