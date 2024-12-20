'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { InputField } from '@/components/molecule';
import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { SignUpSchema, TSignUpSchema } from './validSchema';

const SignUpForm = () => {
  const form = useForm<TSignUpSchema>({
    resolver: zodResolver(SignUpSchema),
    mode: 'onSubmit'
  });

  const onSubmit = useCallback((value: TSignUpSchema) => {
    console.log(value);
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          name="fullname"
          control={form.control}
          label="Full name"
          placeholder="Your full name"
        />
        <InputField
          name="email"
          control={form.control}
          label="Email"
          placeholder="Your email"
        />
        <InputField
          name="password"
          control={form.control}
          label="Password"
          placeholder="Your password"
          type="password"
        />
        <div className="w-full text-center">
          <Button
            size={'lg'}
            loading={false}
            disabled={false}
            className="m-auto mt-2 rounded-[40px] hover:bg-primary shadow-primaryBtn"
          >
            SIGN UP
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
