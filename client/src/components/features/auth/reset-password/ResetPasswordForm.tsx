'use client';

import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { ResetPasswordSchema, TResetPasswordSchema } from './validSchema';
import { InputField } from '@/components/molecule';
import { Button } from '@/components/ui/button';

const ResetPasswordForm = () => {
  const form = useForm<TResetPasswordSchema>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: 'onSubmit'
  });

  const onSubmit = useCallback((value: TResetPasswordSchema) => {
    console.log(value);
  }, []);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <InputField
          name="email"
          control={form.control}
          label=""
          placeholder="Your email"
        />
        <div className="w-full text-center">
          <Button
            size={'lg'}
            loading={false}
            disabled={false}
            className="m-auto mt-2 rounded-[40px] hover:bg-primary shadow-primaryBtn"
          >
            Reset Password
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
