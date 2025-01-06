"use client";

import { useForm } from "react-hook-form";
import { SignInSchema, TSignInSchema } from "./validSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { Form } from "@/components/ui/form";
import { InputField } from "@/components/molecule";
import { Button } from "@/components/ui/button";
import { PATHNAME } from "@/configs";
import Link from "next/link";
import { useSignInMutation } from "@/queries";
import { useAuthStore } from "@/stores";
import { useMessage } from "@/hooks/useMessage";
import { IApiErrorResponse, ISignIn } from "@/interfaces";
import { MapperUser } from "@/mapping/user.mapping";
import useRedirect from "@/hooks/useRedirect";

const SignInForm = () => {
  const form = useForm<TSignInSchema>({
    resolver: zodResolver(SignInSchema),
    mode: "onSubmit",
  });

  const { mutateAsync, isPending } = useSignInMutation();
  const { setUserInfo, setTokens, reset } = useAuthStore();
  const message = useMessage();
  const { onRedirect } = useRedirect();

  const onSubmit = useCallback(
    (value: ISignIn) => {
      reset();
      mutateAsync(value, {
        onSuccess: (res) => {
          if (res && res?.data) {
            const { accessToken, ...userInfo } = res.data;
            setUserInfo(MapperUser(userInfo));
            setTokens(accessToken);
            onRedirect(userInfo);
            return;
          }
        },
        onError: (err: IApiErrorResponse) => {
          message.error(err?.message);
        },
      });
    },
    [mutateAsync, setUserInfo, setTokens, message, onRedirect, reset]
  );
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <InputField
          name="email"
          control={form.control}
          label="Email"
          placeholder="Your email"
        />
        <InputField
          name="password"
          control={form.control}
          label="Password"
          placeholder="Your password"
          type="password"
        />
        <div className="text-right !mt-3">
          <Link
            href={PATHNAME.FORGOT_PASSWORD}
            className="text-sm text-lightGray hover:text-primary"
          >
            Forgot password?
          </Link>
        </div>
        <div className="w-full text-center">
          <Button
            size={"lg"}
            loading={isPending}
            disabled={isPending}
            className="m-auto mt-2 rounded-[40px] hover:bg-primary shadow-primaryBtn"
          >
            LOGIN
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;
