"use client";

import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

const ProfileSchema = z.object({
  email: z.string().email().optional(),
  fullName: z
    .string()
    .min(3, { message: "Name must be at least 6 characters long" })
    .max(20)
    .regex(
      /^[a-zA-ZÀ-ỹ\s]+$/,
      "Full name should only contain letters and spaces"
    )
    .optional(),
  phone: z
    .string()
    .refine((phone) => !phone || isValidPhoneNumber(phone), {
      message: "Invalid phone number",
    })
    .optional(),
  dob: z.date().optional(),
});

type TProfileSchema = z.infer<typeof ProfileSchema>;

export { ProfileSchema };
export type { TProfileSchema };
