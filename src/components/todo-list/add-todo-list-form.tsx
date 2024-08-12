import { Icons } from "@/components/icons";
import { useTodoListAddMutation } from "@/hooks/data/todo-lists";
import { useControlledForm } from "@/hooks/form";
import { Button, Field, Input, Label } from "@headlessui/react";
import { ErrorMessage } from "@hookform/error-message";
import clsx from "clsx";
import { useMemo } from "react";
import { Controller } from "react-hook-form";
import * as z from "zod";

const ADD_TODO_LIST_FORM_SCHEMA = z.object({
  name: z
    .string()
    .min(5, { message: "Názov musí obsahovať aspoň 5 znakov" })
    .max(100, { message: "Názov môže obsahovať maximálne 100 znakov" }),
});
export type AddTodoListFormValues = z.infer<typeof ADD_TODO_LIST_FORM_SCHEMA>;

export default function AddTodoListForm() {
  const { mutate: addTodoList, isPending } = useTodoListAddMutation();
  const defaultValues = useMemo<AddTodoListFormValues>(() => {
    return {
      name: "",
    };
  }, []);

  const form = useControlledForm<AddTodoListFormValues>({
    schema: ADD_TODO_LIST_FORM_SCHEMA,
    defaultValues,
  });

  function onSubmit(values: AddTodoListFormValues) {
    addTodoList(values);
    form.reset();
  }

  return (
    <div className="flex flex-col items-center justify-center w-full p-5">
      <h1 className="text-2xl">Pridanie nového zoznamu úloh</h1>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full px-2 sm:px-4 gap-y-5"
      >
        <div className="w-full mt-5 sm:w-80">
          <Controller
            name="name"
            control={form.control}
            render={({ field: { onChange, value } }) => (
              <Field>
                <Label className="text-base font-medium text-foreground">
                  Názov zoznamu
                </Label>
                <Input
                  placeholder="Zadajte názov zoznamu"
                  value={value}
                  onChange={onChange}
                  className={clsx(
                    "mt-1 block w-full rounded-lg text-foreground bg-background border border-foreground py-1.5 px-4 h-10"
                  )}
                />
                <ErrorMessage
                  errors={form.formState.errors}
                  name="name"
                  render={({ message }) => (
                    <p className="mt-1 text-destructive">{message}</p>
                  )}
                />
              </Field>
            )}
          />
        </div>
        <Button
          className="flex items-center justify-center w-full px-4 py-2 text-sm rounded bg-primary sm:w-80"
          type="submit"
          disabled={isPending}
        >
          {isPending && <Icons.spinner className="mr-2 animate-spin" />}
          Pridať zoznam
        </Button>
      </form>
    </div>
  );
}
