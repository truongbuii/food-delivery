import { z } from 'zod';

const SignUpSchema = z.object({
  fullname: z
    .string()
    .min(3, { message: 'Name must be at least 6 characters long' })
    .max(20)
    .regex(
      /^[a-zA-ZÀ-ỹ\s]+$/,
      'Full name should only contain letters and spaces'
    ),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(20, { message: 'Password must be at most 20 characters long' })
});

type TSignUpSchema = z.infer<typeof SignUpSchema>;

export { SignUpSchema };
export type { TSignUpSchema };
