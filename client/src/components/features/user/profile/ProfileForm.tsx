"use client";

import { DatePicker, CustomFormField } from "@/components/molecule";
import { ProfileSchema, TProfileSchema } from "./validSchema";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/stores";
import { PhoneInput } from "@/components/ui/phone-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ProfileForm = () => {
  const { userInfo } = useAuthStore();

  const form = useForm<TProfileSchema>({
    resolver: zodResolver(ProfileSchema),
    mode: "onSubmit",
    defaultValues: {
      email: userInfo?.email || "",
      fullName: userInfo?.fullName || "",
      phone: userInfo?.phoneNumber || "",
      dob: userInfo?.dob ? new Date(userInfo.dob) : undefined,
    },
  });

  useEffect(() => {
    if (userInfo) {
      form.reset({
        email: userInfo.email || "",
        fullName: userInfo.fullName || "",
        phone: userInfo.phoneNumber || "",
        dob: userInfo.dob ? new Date(userInfo.dob) : undefined,
      });
    }
  }, [userInfo, form]);

  const onSubmit = useCallback((value: TProfileSchema) => {
    console.log(value);
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <CustomFormField
          control={form.control}
          name="email"
          label="Email"
          renderInput={({ id, value }) => (
            <Input
              id={id}
              value={value || ""}
              placeholder="Your email"
              disabled
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
          name="fullName"
          label="Full Name"
          renderInput={({ id, value, onChange }) => (
            <Input
              id={id}
              value={value || ""}
              onChange={onChange}
              placeholder="Your full name"
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
          name="phone"
          label="Phone"
          renderInput={({ id, value, onChange }) => (
            <PhoneInput
              id={id}
              value={value}
              onChange={onChange}
              defaultCountry="VN"
              placeholder="Enter a phone number"
              className="!mt-0"
            />
          )}
        />
        <CustomFormField
          control={form.control}
          name="dob"
          label="Date of Birth"
          renderInput={({ id, value, onChange }) => (
            <DatePicker id={id} value={value} onChange={onChange} />
          )}
        />
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
