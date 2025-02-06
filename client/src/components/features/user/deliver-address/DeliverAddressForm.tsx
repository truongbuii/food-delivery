"use client";

import { DeliverAddressSchema } from "@/components/features/user/deliver-address/validSchema";
import { CustomFormField } from "@/components/molecule";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { SheetClose } from "@/components/ui/sheet";
import { useMessage } from "@/hooks/useMessage";
import { IDeliveryAddress } from "@/interfaces";
import {
  useCreateDeliverAddrMutation,
  useUpdateDeliverAddrMutation,
} from "@/queries";
import { useUserStore } from "@/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { FC, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";

interface IDeliverAddressFormProps {
  status?: boolean;
  address?: IDeliveryAddress;
  refetchList?: () => void;
}

const DeliverAddressForm: FC<IDeliverAddressFormProps> = ({
  status,
  address,
  refetchList,
}) => {
  const message = useMessage();
  const { id: userId, phoneNumber } = useUserStore(
    (state) => state.userInfo || {}
  );
  const { mutateAsync: createMutate, isPending: createPending } =
    useCreateDeliverAddrMutation();
  const { mutateAsync: updateMutate, isPending: updatePending } =
    useUpdateDeliverAddrMutation();

  const defaultValues = useMemo(
    () => ({
      name: address?.name || "",
      phoneNumber: address?.phoneNumber || phoneNumber || "",
      state: address?.state || "",
      city: address?.city || "",
      street: address?.street || "",
    }),
    [address, phoneNumber]
  );
  const form = useForm<IDeliveryAddress>({
    resolver: zodResolver(DeliverAddressSchema),
    mode: "onSubmit",
    defaultValues,
  });

  const onSubmit = useCallback(
    async (data: IDeliveryAddress) => {
      try {
        if (status) {
          await updateMutate({ ...data, id: address?.id });
          message.success("Address updated successfully");
        } else {
          await createMutate({ userId: userId!, ...data });
          message.success("Address added successfully");
        }
        refetchList?.();
      } catch (err: any) {
        message.error(err.message);
      }
    },
    [status, address, userId, message, refetchList, createMutate, updateMutate]
  );

  return (
    <>
      <div className="relative p-6 flex items-center z-[50] w-full">
        <SheetClose asChild>
          <Button className="bg-secondary w-10 h-10 rounded-[12px] shadow-backBtnShadow hover:bg-primary ">
            <ChevronLeft size={18} className="text-foreground" />
          </Button>
        </SheetClose>
        <p className="flex-1 w-full text-center leading-10 text-lg font-medium">
          {status ? "Update Address" : "Add New Address"}
        </p>
      </div>
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
                  value={value || ""}
                  onChange={onChange}
                  // international={false}
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
                loading={createPending || updatePending}
                disabled={createPending || updatePending}
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
