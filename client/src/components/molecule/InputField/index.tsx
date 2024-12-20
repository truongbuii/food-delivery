import { Control, FieldValues, Path } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { ReactNode } from 'react';

interface InputFieldProps<Type extends FieldValues> {
  control: Control<Type>;
  name: Path<Type>;
  label?: ReactNode | string;
  placeholder?: string;
  type?: string;
}

const InputField = <T extends FieldValues>({
  control,
  name,
  label,
  ...rest
}: InputFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      defaultValue={'' as any}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className="font-medium text-[#9796A1]">
              {label}
            </FormLabel>
          )}
          <FormControl>
            <Input
              style={{
                height: '55px',
                borderRadius: '10px',
                marginTop: '4px',
                padding: '14px 12px'
              }}
              id={name}
              onChange={field.onChange}
              {...rest}
            />
          </FormControl>
          <FormMessage className="!mt-[4px] px-1 text-[12px] font-normal text-[#ff402e]" />
        </FormItem>
      )}
    />
  );
};

export default InputField;
