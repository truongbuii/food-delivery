import { z } from 'zod';

const SignInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(20, { message: 'Password must be at most 20 characters long' })
});

type TSignInSchema = z.infer<typeof SignInSchema>;

export { SignInSchema };
export type { TSignInSchema };
