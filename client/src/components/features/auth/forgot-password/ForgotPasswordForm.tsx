"use client";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { ResetPasswordSchema, TResetPasswordSchema } from "./validSchema";
import { InputField } from "@/components/molecule";
import { Button } from "@/components/ui/button";
import { useForgotPasswordMutation } from "@/queries";
import { useMessage } from "@/hooks/useMessage";
import { IApiErrorResponse, IEmailPost } from "@/interfaces";

const ForgotPasswordForm = () => {
  const form = useForm<TResetPasswordSchema>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: "onSubmit",
  });

  const { mutateAsync, isPending } = useForgotPasswordMutation();
  const message = useMessage();

  const onSubmit = useCallback(
    (value: IEmailPost) => {
      mutateAsync(value, {
        onSuccess: () => {
          message.success("Please check your email!");
        },
        onError: (err: IApiErrorResponse) => {
          message.error(err.message);
        },
      });
    },
    [mutateAsync, message]
  );
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <InputField
          name="email"
          control={form.control}
          label=""
          placeholder="Your email"
        />
        <div className="w-full text-center">
          <Button
            size={"lg"}
            loading={isPending}
            disabled={isPending}
            className="m-auto mt-2 rounded-[40px] hover:bg-primary shadow-primaryBtnShadow"
          >
            Reset Password
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
