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

  const onSubmit = useCallback((value: TPhoneRegistrationSchema) => {
    console.log(value);
  }, []);

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
            loading={false}
            disabled={false}
            className="m-auto mt-2 rounded-[40px] hover:bg-primary shadow-primaryBtn"
          >
            SEND
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PhoneRegistrationForm;
