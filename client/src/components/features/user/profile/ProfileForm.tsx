"use client";

import {
  CustomFormField,
  AvatarUpload,
  DatePicker,
} from "@/components/molecule";
import { ProfileSchema, TProfileSchema } from "./validSchema";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PhoneInput } from "@/components/ui/phone-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IApiErrorResponse, IProfile } from "@/interfaces";
import { useUpdateProfile } from "@/queries/user";
import { useMessage } from "@/hooks/useMessage";
import { useAuthActions } from "@/stores";

const ProfileForm = () => {
  const message = useMessage();
  const { setAuth, userInfo } = useAuthActions();
  const { mutateAsync, isPending } = useUpdateProfile();
  const [avatarFile, setAvatarFile] = useState<File | undefined>();

  const { fullName, phoneNumber, dob, email, avatarUrl } = userInfo || {};
  const handleAvatarUpdate = (newAvatarFile: File) => {
    setAvatarFile(newAvatarFile);
  };

  const form = useForm<TProfileSchema>({
    resolver: zodResolver(ProfileSchema),
    mode: "onSubmit",
    defaultValues: {
      fullName: fullName || "",
      phoneNumber: phoneNumber || "",
      dob: dob || undefined,
    },
  });

  useEffect(() => {
    if (userInfo) {
      form.reset({
        fullName: fullName || "",
        phoneNumber: phoneNumber || "",
        dob: dob || undefined,
      });
    }
  }, [userInfo, form, fullName, phoneNumber, dob]);

  const onSubmit = useCallback(
    (data: IProfile) => {
      const value: IProfile = {
        ...data,
        email,
        avatar: avatarFile,
      };
      mutateAsync(value, {
        onSuccess: (res) => {
          if (res && res.data) {
            const { ...userInfo } = res.data;
            setAuth(userInfo);
            message.success("Update successfully!");
            return;
          }
        },
        onError: (err: IApiErrorResponse) => {
          message.error(err?.message);
        },
      });
    },
    [avatarFile, mutateAsync, message, email, setAuth]
  );

  return (
    <>
      <AvatarUpload
        currentAvatar={avatarFile ? URL.createObjectURL(avatarFile) : avatarUrl}
        onAvatarChange={handleAvatarUpdate}
        fullName={userInfo?.fullName || ""}
        className="absolute top-24 left-1/2 transform -translate-x-1/2"
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            name="phoneNumber"
            label="Phone Number"
            renderInput={({ id, value, onChange }) => (
              <PhoneInput
                id={id}
                value={value}
                onChange={onChange}
                international={false}
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
              loading={isPending}
              disabled={isPending}
              className="m-auto mt-4 rounded-[40px] hover:bg-primary shadow-primaryBtnShadow"
            >
              SAVE
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ProfileForm;
