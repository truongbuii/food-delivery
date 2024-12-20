'use client';

import { InputField } from '@/components/molecule';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ChangePasswordSchema, TChangePasswordSchema } from './validSchema';
import { useCallback } from 'react';
import { Button } from '@/components/ui/button';

const ChangePasswordForm = () => {
  const form = useForm<TChangePasswordSchema>({
    resolver: zodResolver(ChangePasswordSchema),
    mode: 'onSubmit'
  });

  const onSubmit = useCallback((value: TChangePasswordSchema) => {
    console.log(value);
  }, []);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <InputField
          name="password"
          control={form.control}
          label="New password"
          placeholder="Enter your new password"
        />
        <InputField
          name="confirmPassword"
          control={form.control}
          label="Confirm password"
          placeholder="Enter your new password again"
          type="password"
        />
        <div className="w-full text-center">
          <Button
            size={'lg'}
            loading={false}
            disabled={false}
            className="m-auto mt-2 rounded-[40px] hover:bg-primary shadow-primaryBtn"
          >
            Change password
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
