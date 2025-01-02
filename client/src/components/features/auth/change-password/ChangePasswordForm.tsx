"use client";

import { InputField } from "@/components/molecule";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ChangePasswordSchema, TChangePasswordSchema } from "./validSchema";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useChangePasswordMutation } from "@/queries";
import { useMessage } from "@/hooks/useMessage";
import { IApiErrorResponse } from "@/interfaces";
import { useRouter, useSearchParams } from "next/navigation";
import { PATHNAME } from "@/configs";

interface IFormValues {
  password: string;
  confirmPassword: string;
}

const ChangePasswordForm = () => {
  const form = useForm<TChangePasswordSchema>({
    resolver: zodResolver(ChangePasswordSchema),
    mode: "onSubmit",
  });

  const { push } = useRouter();
  const message = useMessage();
  const params = useSearchParams();
  const email = params.get("email");
  const otp = params.get("otp");
  const { mutateAsync, isPending } = useChangePasswordMutation();

  const onSubmit = useCallback(
    (formValues: IFormValues) => {
      const { password } = formValues;
      const values = { password, email, otp };
      mutateAsync(values, {
        onSuccess: () => {
          message.success("Password changed successfully");
          push(PATHNAME.SIGN_IN);
        },
        onError: (err: IApiErrorResponse) => {
          message.error(err?.message);
        },
      });
    },
    [email, otp, mutateAsync, message, push]
  );
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <InputField
          name="password"
          control={form.control}
          label="New password"
          placeholder="Enter your new password"
        />
        <InputField
          name="confirmPassword"
          control={form.control}
          label="Confirm password"
          placeholder="Enter your new password again"
          type="password"
        />
        <div className="w-full text-center">
          <Button
            size={"lg"}
            loading={isPending}
            disabled={isPending}
            className="m-auto mt-2 rounded-[40px] hover:bg-primary shadow-primaryBtn"
          >
            Change password
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
