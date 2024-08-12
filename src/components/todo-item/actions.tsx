import { Icons } from "@/components/icons";
import {
  TodoItem as TodoItemType,
  useTodoItemDeleteMutation,
  useTodoItemToggleCompleteMutation,
} from "@/hooks/data/todo-item";
import { Button } from "@headlessui/react";

type Props = {
  todoItem: TodoItemType;
};

export default function Actions({ todoItem }: Props) {
  const { mutate: deleteTodoItem, isPending: isDeletePending } =
    useTodoItemDeleteMutation();
  const { mutate: toggleCompleteTodoItem, isPending: isToggleCompletePending } =
    useTodoItemToggleCompleteMutation();

  return (
    <div className="flex mt-2 gap-x-2">
      <Button
        className="flex items-center justify-center w-full px-4 py-2 text-sm rounded-md bg-primary sm:w-80"
        onClick={() => toggleCompleteTodoItem(todoItem)}
        disabled={isToggleCompletePending || todoItem.is_pending}
      >
        {isToggleCompletePending && (
          <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
        )}
        {todoItem.is_completed ? "Mark as incomplete" : "Mark as complete"}
      </Button>
      <Button
        className="flex items-center justify-center w-full px-4 py-2 text-sm rounded-md bg-destructive sm:w-80"
        onClick={() => deleteTodoItem(todoItem)}
        disabled={isDeletePending || todoItem.is_pending}
      >
        {isDeletePending && (
          <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
        )}
        Delete todo
      </Button>
    </div>
  );
}
