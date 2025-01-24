"use client";

import { useForm } from "react-hook-form";
import { SignInSchema, TSignInSchema } from "./validSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { Form } from "@/components/ui/form";
import { CustomFormField } from "@/components/molecule";
import { Button } from "@/components/ui/button";
import { PATHNAME } from "@/configs";
import Link from "next/link";
import { useSignInMutation } from "@/queries";
import { useAuthActions } from "@/stores";
import { useMessage } from "@/hooks/useMessage";
import { IApiErrorResponse, ISignIn } from "@/interfaces";
import useRedirect from "@/hooks/useRedirect";
import { Input } from "@/components/ui/input";

const SignInForm = () => {
  const form = useForm<TSignInSchema>({
    resolver: zodResolver(SignInSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const message = useMessage();
  const { onRedirect } = useRedirect();
  const { setAuth, resetAuth } = useAuthActions();
  const { mutateAsync, isPending } = useSignInMutation();

  const onSubmit = useCallback(
    (value: ISignIn) => {
      resetAuth();
      mutateAsync(value, {
        onSuccess: (res) => {
          if (res && res?.data) {
            const { ...userInfo } = res.data;
            setAuth(userInfo);
            onRedirect(userInfo);
            return;
          }
        },
        onError: (err: IApiErrorResponse) => {
          message.error(err?.message);
        },
      });
    },
    [mutateAsync, message, onRedirect, resetAuth, setAuth]
  );
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <CustomFormField
          control={form.control}
          name="email"
          label="Email"
          renderInput={({ id, value, onChange }) => (
            <Input
              id={id}
              value={value || ""}
              onChange={onChange}
              placeholder="Your email"
              style={{
                height: "55px",
                borderRadius: "10px",
                marginTop: "4px",
                padding: "14px 12px",
              }}
            />
          )}
        />
        <CustomFormField
          control={form.control}
          name="password"
          label="Password"
          renderInput={({ id, value, onChange }) => (
            <Input
              id={id}
              type="password"
              value={value || ""}
              onChange={onChange}
              placeholder="Password"
              style={{
                height: "55px",
                borderRadius: "10px",
                marginTop: "4px",
                padding: "14px 12px",
              }}
            />
          )}
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
            className="m-auto mt-2 rounded-[40px] hover:bg-primary shadow-primaryBtnShadow"
          >
            LOGIN
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;
