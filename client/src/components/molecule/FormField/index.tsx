import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { ReactNode } from "react";

interface CustomFormFieldProps<Type extends FieldValues> {
  control: Control<Type>;
  name: Path<Type>;
  label?: ReactNode | string;
  renderInput: (field: {
    id: string;
    value: any;
    onChange: (value: any) => void;
  }) => ReactNode;
}

const CustomFormField = <T extends FieldValues>({
  control,
  name,
  label,
  renderInput,
}: CustomFormFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className="font-medium text-[#9796A1]">
              {label}
            </FormLabel>
          )}
          <FormControl>
            {renderInput({
              id: name,
              value: field.value,
              onChange: field.onChange,
            })}
          </FormControl>
          <FormMessage className="!mt-[4px] px-1 text-[12px] font-normal text-[#ff402e]" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
