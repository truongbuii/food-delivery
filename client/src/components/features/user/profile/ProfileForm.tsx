"use client";

import { DatePicker, InputField } from "@/components/molecule";
import { ProfileSchema, TProfileSchema } from "./validSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/stores";
import { PhoneInput } from "@/components/ui/phone-input";
import { Button } from "@/components/ui/button";

const ProfileForm = () => {
  const { userInfo } = useAuthStore();

  const form = useForm<TProfileSchema>({
    resolver: zodResolver(ProfileSchema),
    mode: "onSubmit",
  });

  const onSubmit = useCallback((value: TProfileSchema) => {
    console.log(value);
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          name="email"
          control={form.control}
          label="Email"
          value={userInfo?.email || ""}
          disabled
        />
        <InputField
          name="fullName"
          control={form.control}
          label="Full name"
          placeholder="Your full name"
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-[#9796A1]">
                Phone Number
              </FormLabel>
              <FormControl>
                <PhoneInput
                  defaultCountry="VN"
                  placeholder="Enter a phone number"
                  className="!mt-0"
                  {...field}
                />
              </FormControl>
              <FormMessage className="!mt-[4px] px-1 text-[12px] font-normal text-[#ff402e]" />
            </FormItem>
          )}
        />
        <DatePicker />
        <div className="w-full text-center">
          <Button
            size={"lg"}
            loading={false}
            disabled={false}
            className="m-auto mt-2 rounded-[40px] hover:bg-primary shadow-primaryBtnShadow"
          >
            SAVE
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
