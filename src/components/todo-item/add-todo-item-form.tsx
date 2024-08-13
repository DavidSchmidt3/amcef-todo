import DatePickerField from "@/components/forms/date-picker-field";
import { SubmitButton } from "@/components/forms/submit-button";
import TextField from "@/components/forms/text-field";
import { useTodoItemAddMutation } from "@/hooks/data/todo-item";
import { useControlledForm } from "@/hooks/form";
import { useEffect, useMemo } from "react";
import * as z from "zod";

const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 100;
const MAX_DESCRIPTION_LENGTH = 255;
const ADD_TODO_ITEM_FORM_SCHEMA = z.object({
  title: z
    .string()
    .min(MIN_NAME_LENGTH, {
      message: `Name must be at least ${MIN_NAME_LENGTH} characters long`,
    })
    .max(MAX_NAME_LENGTH, {
      message: `Name can be at most ${MAX_NAME_LENGTH} characters long`,
    }),
  description: z.string().max(MAX_DESCRIPTION_LENGTH, {
    message: `Description can be at most ${MAX_DESCRIPTION_LENGTH} characters long`,
  }),
  is_completed: z.boolean(),
  due_date: z.date().or(z.undefined()).or(z.null()),
  todo_listId: z.string(),
});
export type AddTodoItemFormValues = z.infer<typeof ADD_TODO_ITEM_FORM_SCHEMA>;

type Props = {
  todoListId: string;
};

export default function AddTodoItemForm({ todoListId }: Props) {
  const { mutate: addTodoItem, isPending, reset } = useTodoItemAddMutation();
  const defaultValues = useMemo<AddTodoItemFormValues>(() => {
    return {
      title: "",
      description: "",
      is_completed: false,
      todo_listId: todoListId,
      due_date: null,
    };
  }, [todoListId]);

  const form = useControlledForm<AddTodoItemFormValues>({
    schema: ADD_TODO_ITEM_FORM_SCHEMA,
    defaultValues,
  });

  function onSubmit(values: AddTodoItemFormValues) {
    addTodoItem(values);
  }

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset();
      reset();
    }
  }, [form, reset, form.formState.isSubmitSuccessful]);

  return (
    <div className="flex flex-col items-center justify-center w-full p-5 mt-2 border rounded-md">
      <h1 className="text-lg">Add new todo</h1>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full px-2 sm:px-4 gap-y-3"
      >
        <TextField
          form={form}
          label="Task title"
          placeholder="Enter task title"
          fieldName="title"
        />
        <TextField
          form={form}
          label="Task description"
          placeholder="Enter task description"
          fieldName="description"
          textArea
        />
        <DatePickerField form={form} fieldName="due_date" label="Deadline" />
        <SubmitButton isPending={isPending} title="Add todo" />
      </form>
    </div>
  );
}
