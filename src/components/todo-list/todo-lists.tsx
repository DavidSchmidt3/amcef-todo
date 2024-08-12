import TodoList from "@/components/todo-list";
import AddTodoListForm from "@/components/todo-list/add-todo-list-form";
import { useTodoLists } from "@/hooks/data/todo-lists";

export default function Todolists() {
  const { data: todoLists, isLoading } = useTodoLists();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AddTodoListForm />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {todoLists?.map((todoList) => (
          <TodoList key={todoList.id} todoList={todoList} />
        ))}
      </div>
    </>
  );
}
