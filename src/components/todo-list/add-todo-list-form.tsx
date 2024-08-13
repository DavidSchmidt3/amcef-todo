import { SubmitButton } from "@/components/forms/submit-button";
import TextField from "@/components/forms/text-field";
import { useTodoListAddMutation } from "@/hooks/data/todo-lists";
import { useControlledForm } from "@/hooks/form";
import { useEffect, useMemo } from "react";
import * as z from "zod";

const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 100;
const ADD_TODO_LIST_FORM_SCHEMA = z.object({
  name: z
    .string()
    .min(MIN_NAME_LENGTH, {
      message: `Name must be at least ${MIN_NAME_LENGTH} characters long`,
    })
    .max(MAX_NAME_LENGTH, {
      message: `Name can be at most ${MAX_NAME_LENGTH} characters long`,
    }),
});
export type AddTodoListFormValues = z.infer<typeof ADD_TODO_LIST_FORM_SCHEMA>;

export default function AddTodoListForm() {
  const {
    mutate: addTodoList,
    isPending,
    isSuccess,
    reset,
  } = useTodoListAddMutation();
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
  }

  useEffect(() => {
    if (isSuccess) {
      form.reset();
      reset();
    }
  }, [form, isSuccess, reset]);

  return (
    <div className="flex flex-col items-center justify-center w-full p-5">
      <h1 className="text-3xl">Add new task list</h1>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full px-2 mt-4 sm:px-4 gap-y-4"
      >
        <TextField
          form={form}
          label="Task list name"
          placeholder="Enter task list name"
          fieldName="name"
        />
        <SubmitButton isPending={isPending} title="Add new task list" />
      </form>
    </div>
  );
}
