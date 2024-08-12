import { type TodoList as TodoListType } from "@/hooks/data/todo-lists";

type Props = {
  todoList: TodoListType;
};

export default function TodoList({ todoList }: Props) {
  return (
    <div>
      id - {todoList.id}
      name - {todoList.name}
    </div>
  );
}
