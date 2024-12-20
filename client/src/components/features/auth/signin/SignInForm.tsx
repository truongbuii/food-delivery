'use client';

import { useForm } from 'react-hook-form';
import { SignInSchema, TSignInSchema } from './validSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { Form } from '@/components/ui/form';
import { InputField } from '@/components/molecule';
import { Button } from '@/components/ui/button';
import { PATHNAME } from '@/configs';
import Link from 'next/link';

const SignInForm = () => {
  const form = useForm<TSignInSchema>({
    resolver: zodResolver(SignInSchema),
    mode: 'onSubmit'
  });

  const onSubmit = useCallback((value: TSignInSchema) => {
    console.log(value);
  }, []);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
        <div className="text-right !mt-3">
          <Link
            href={PATHNAME.RESET_PASSWORD}
            className="text-sm text-lightGray hover:text-primary"
          >
            Forgot password?
          </Link>
        </div>
        <div className="w-full text-center">
          <Button
            size={'lg'}
            loading={false}
            disabled={false}
            className="m-auto mt-2 rounded-[40px] hover:bg-primary shadow-primaryBtn"
          >
            LOGIN
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;
