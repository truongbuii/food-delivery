import { z } from 'zod';

const VerificationSchema = z.object({
  pin: z.string().min(4, {
    message: 'Verification code must be 4 digits'
  })
});

type TVerificationSchema = z.infer<typeof VerificationSchema>;

export { VerificationSchema };
export type { TVerificationSchema };
