import TodoList from "@/components/todo-list";
import AddTodoListForm from "@/components/todo-list/add-todo-list-form";
import { useTodoLists } from "@/hooks/data/todo-lists";

export default function Todolists() {
  const { data: todoLists, isLoading } = useTodoLists();

  if (isLoading) {
    return <div>Načítavam...</div>;
  }

  return (
    <>
      <AddTodoListForm />
      {todoLists?.map((todoList) => (
        <TodoList key={todoList.id} todoList={todoList} />
      ))}
    </>
  );
}
