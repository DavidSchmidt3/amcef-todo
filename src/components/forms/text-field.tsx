import { Field, Input, Label, Textarea } from "@headlessui/react";
import {
  ErrorMessage,
  FieldValuesFromFieldErrors,
} from "@hookform/error-message";
import {
  Controller,
  FieldErrors,
  FieldName,
  FieldPath,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";

type Props<T extends FieldValues, K extends FieldPath<T>> = {
  form: UseFormReturn<T>;
  label: string;
  placeholder: string;
  fieldName: K;
  textArea?: boolean;
};

export default function TextField<
  T extends FieldValues,
  K extends FieldPath<T>
>({ form, label, placeholder, fieldName, textArea }: Props<T, K>) {
  return (
    <div className="w-full sm:w-80">
      <Controller
        name={fieldName}
        control={form.control}
        render={({ field: { onChange, value } }) => (
          <Field>
            <Label className="text-base font-medium text-foreground">
              {label}
            </Label>
            {textArea ? (
              <Textarea
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="mt-1 block w-full rounded-lg text-foreground bg-background border border-foreground py-1.5 px-2 h-28"
              />
            ) : (
              <Input
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="mt-1 block w-full rounded-lg text-foreground bg-background border border-foreground py-1.5 px-2 h-10"
              />
            )}
            <ErrorMessage
              errors={form.formState.errors}
              name={
                fieldName as unknown as FieldName<
                  FieldValuesFromFieldErrors<FieldErrors<T>>
                >
              }
              render={({ message }) => (
                <p className="mt-1 text-destructive">{message}</p>
              )}
            />
          </Field>
        )}
      />
    </div>
  );
}
