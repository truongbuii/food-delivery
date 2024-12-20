import { z } from 'zod';

const ChangePasswordSchema = z
  .object({
    password: z.string().min(6).max(20),
    confirmPassword: z.string().min(6).max(20)
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password does not match',
    path: ['confirmPassword']
  });

type TChangePasswordSchema = z.infer<typeof ChangePasswordSchema>;

export { ChangePasswordSchema };

export type { TChangePasswordSchema };
