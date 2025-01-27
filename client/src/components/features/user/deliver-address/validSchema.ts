import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

const DeliverAddressSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Address must be at least 3 characters long" }),
  phoneNumber: z
    .string()
    .min(1, { message: "Phone number is required" })
    .refine((phone) => isValidPhoneNumber(phone), {
      message: "Invalid phone number",
    }),
  state: z.string().min(1, { message: "State is required" }),
  city: z.string().min(1, { message: "City is required" }),
  street: z.string().min(1, { message: "District is required" }),
});

type TDeliverAddressSchema = z.infer<typeof DeliverAddressSchema>;

export { DeliverAddressSchema };
export type { TDeliverAddressSchema };
