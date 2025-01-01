import { z } from 'zod';

const ResetPasswordSchema = z.object({
  email: z.string().email()
});

type TResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;

export { ResetPasswordSchema };
export type { TResetPasswordSchema };
