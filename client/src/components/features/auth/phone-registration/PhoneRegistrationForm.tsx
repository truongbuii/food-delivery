"use client";

import { CustomFormField } from "@/components/molecule";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { PhoneInput } from "@/components/ui/phone-input";
import { PATHNAME } from "@/configs";
import { useMessage } from "@/hooks/useMessage";
import useRedirect from "@/hooks/useRedirect";
import { IPhoneRegister } from "@/interfaces";
import { MapperUser } from "@/mapping/user.mapping";
import { usePhoneRegisterMutation } from "@/queries";
import { useAuthStore } from "@/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

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

  const { mutateAsync, isPending } = usePhoneRegisterMutation();
  const { setUserInfo } = useAuthStore();
  const message = useMessage();
  const { push } = useRouter();
  const { onRedirect } = useRedirect();

  const onSubmit = useCallback(
    (data: { phone: string }) => {
      const email = useAuthStore.getState().userInfo?.email;
      if (!email) {
        message.error("Oops! Something went wrong");
        push(PATHNAME.SIGN_IN);
        return;
      }
      const value: IPhoneRegister = {
        email,
        phoneNumber: data.phone,
      };

      mutateAsync(value, {
        onSuccess: (res) => {
          if (res && res?.data) {
            const { ...userInfo } = res.data;
            setUserInfo(MapperUser(userInfo));
            onRedirect(userInfo);
            return;
          }
        },
        onError: (err) => {
          message.error(err?.message);
        },
      });
    },
    [mutateAsync, message, push, setUserInfo, onRedirect]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <CustomFormField
          control={form.control}
          name="phone"
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
        <div className="w-full text-center">
          <Button
            size={"lg"}
            loading={isPending}
            disabled={isPending}
            className="m-auto mt-2 rounded-[40px] hover:bg-primary shadow-primaryBtnShadow"
          >
            SEND
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PhoneRegistrationForm;
