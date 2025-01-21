"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { InputField } from "@/components/molecule";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { SignUpSchema, TSignUpSchema } from "./validSchema";
import { useSignUpMutation } from "@/queries";
import { useAuthStore } from "@/stores";
import { useMessage } from "@/hooks/useMessage";
import { MapperUser } from "@/mapping/user.mapping";
import { IApiErrorResponse, ISignUp } from "@/interfaces";
import useRedirect from "@/hooks/useRedirect";

const SignUpForm = () => {
  const form = useForm<TSignUpSchema>({
    resolver: zodResolver(SignUpSchema),
    mode: "onSubmit",
  });

  const message = useMessage();
  const { onRedirect } = useRedirect();
  const { mutateAsync, isPending } = useSignUpMutation();
  const { setUserInfo, setTokens } = useAuthStore();

  const onSubmit = useCallback(
    (value: ISignUp) => {
      mutateAsync(value, {
        onSuccess: (res) => {
          if (res && res.data) {
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
    [message, mutateAsync, setTokens, setUserInfo, onRedirect]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          name="fullName"
          control={form.control}
          label="Full name"
          placeholder="Your full name"
        />
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
        <div className="w-full text-center">
          <Button
            size={"lg"}
            loading={isPending}
            disabled={isPending}
            className="m-auto mt-2 rounded-[40px] hover:bg-primary shadow-primaryBtnShadow"
          >
            SIGN UP
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
