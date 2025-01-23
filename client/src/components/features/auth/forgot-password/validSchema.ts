import { z } from "zod";

const ResetPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type TResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;

export { ResetPasswordSchema };
export type { TResetPasswordSchema };
