"use client";

import { DeliverAddressSchema } from "@/components/features/user/deliver-address/validSchema";
import { ButtonType, CustomFormField } from "@/components/molecule";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { SheetClose } from "@/components/ui/sheet";
import { IDeliveryAddress } from "@/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";

interface IDeliverAddressFormProps {
  title?: boolean;
}

const DeliverAddressForm: FC<IDeliverAddressFormProps> = ({ title }) => {
  const form = useForm<IDeliveryAddress>({
    resolver: zodResolver(DeliverAddressSchema),
    mode: "onSubmit",
  });

  const onSubmit = (data: IDeliveryAddress) => {
    console.log(data);
  };

  return (
    <>
      <SheetClose asChild>
        <div>
          <ButtonType
            type="back"
            title={title ? "Add new address" : "Update address"}
          />
        </div>
      </SheetClose>
      <div className="flex flex-col gap-5 px-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <CustomFormField
              control={form.control}
              name="name"
              label="Address name"
              renderInput={({ id, value, onChange }) => (
                <Input
                  id={id}
                  value={value || ""}
                  onChange={onChange}
                  placeholder="Home, Work, etc."
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
              name="state"
              label="State"
              renderInput={({ id, value, onChange }) => (
                <Input
                  id={id}
                  value={value || ""}
                  onChange={onChange}
                  placeholder="United States, Vietnam, etc."
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
              name="city"
              label="City"
              renderInput={({ id, value, onChange }) => (
                <Input
                  id={id}
                  value={value || ""}
                  onChange={onChange}
                  placeholder="New York, HCM, etc."
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
              name="street"
              label="Street (Include house number)"
              renderInput={({ id, value, onChange }) => (
                <Input
                  id={id}
                  value={value || ""}
                  onChange={onChange}
                  placeholder="New York, HCM, etc."
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
                loading={false}
                disabled={false}
                className="m-auto mt-4 rounded-[40px] hover:bg-primary shadow-primaryBtnShadow"
              >
                SAVE
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default DeliverAddressForm;
