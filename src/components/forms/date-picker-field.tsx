import DatePickerPrimitive from "@/components/ui/date-picker-primitive";
import { Field } from "@headlessui/react";
import {
  Controller,
  FieldPath,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";

type Props<T extends FieldValues, K extends FieldPath<T>> = {
  form: UseFormReturn<T>;
  fieldName: K;
  label: string;
};

export default function DatePickerField<
  T extends FieldValues,
  K extends FieldPath<T>
>({ form, fieldName, label }: Props<T, K>) {
  return (
    <div className="w-full sm:w-80">
      <Controller
        name={fieldName}
        control={form.control}
        render={({ field: { onChange, value } }) => (
          <Field>
            <DatePickerPrimitive
              onChange={onChange}
              value={value}
              label={label}
            />
          </Field>
        )}
      />
    </div>
  );
}
