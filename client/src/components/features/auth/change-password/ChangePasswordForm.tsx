"use client";

import { CustomFormField } from "@/components/molecule";
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
import { Input } from "@/components/ui/input";

interface IFormValues {
  password: string;
  confirmPassword: string;
}

const ChangePasswordForm = () => {
  const form = useForm<TChangePasswordSchema>({
    resolver: zodResolver(ChangePasswordSchema),
    mode: "onSubmit",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
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
        <CustomFormField
          control={form.control}
          name="password"
          label="Password"
          renderInput={({ id, value, onChange }) => (
            <Input
              id={id}
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
        <CustomFormField
          control={form.control}
          name="confirmPassword"
          label="Confirm password"
          renderInput={({ id, value, onChange }) => (
            <Input
              id={id}
              value={value || ""}
              onChange={onChange}
              placeholder="Enter your new password again"
              style={{
                height: "55px",
                borderRadius: "10px",
                marginTop: "4px",
                padding: "14px 12px",
              }}
            />
          )}
        />
        <div className="w-full text-center">
          <Button
            size={"lg"}
            loading={isPending}
            disabled={isPending}
            className="m-auto mt-2 rounded-[40px] hover:bg-primary shadow-primaryBtnShadow"
          >
            Change password
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
