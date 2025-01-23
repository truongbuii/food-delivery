"use client";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { ResetPasswordSchema, TResetPasswordSchema } from "./validSchema";
import { CustomFormField } from "@/components/molecule";
import { Button } from "@/components/ui/button";
import { useForgotPasswordMutation } from "@/queries";
import { useMessage } from "@/hooks/useMessage";
import { IApiErrorResponse, IEmailPost } from "@/interfaces";
import { Input } from "@/components/ui/input";

const ForgotPasswordForm = () => {
  const form = useForm<TResetPasswordSchema>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
    },
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
        <CustomFormField
          control={form.control}
          name="email"
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
