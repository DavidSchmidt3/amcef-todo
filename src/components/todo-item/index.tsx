import TodoItemActions from "@/components/todo-item/actions";
import { TodoItem as TodoItemType } from "@/hooks/data/todo-item";
import { Icons } from "../icons";

type Props = {
  todoItem: TodoItemType;
};

export default function TodoItem({ todoItem }: Props) {
  return (
    <div className="flex flex-col p-2 border rounded-md">
      <div className="flex justify-between">
        <h3 className="text-2xl text-center">{todoItem.title}</h3>
        <div className="flex gap-x-1">
          {todoItem.is_pending && (
            <Icons.spinner className="text-blue-500 animate-spin" />
          )}
          {todoItem.is_completed ? (
            <Icons.tick className="w-6 h-6 text-green-500" />
          ) : (
            <Icons.cross className="w-6 h-6 text-red-500" />
          )}
        </div>
      </div>
      <p>Description: {todoItem.description}</p>
      <p>
        Due date:
        {todoItem.due_date ? new Date(todoItem.due_date).toLocaleString() : ""}
      </p>
      <p>Is completed: {todoItem.is_completed ? "Yes" : "No"}</p>
      <TodoItemActions todoItem={todoItem} />
    </div>
  );
}
