import TodoItem from "@/components/todo-item";
import AddTodoItemForm from "@/components/todo-item/add-todo-item-form";
import TodoListFilter from "@/components/todo-list/filter";
import TodoListSearch from "@/components/todo-list/search";
import { useTodoItems } from "@/hooks/data/todo-item";
import { type TodoList as TodoListType } from "@/hooks/data/todo-lists";
import { useFilteredTodoItems } from "@/hooks/todos-filter";

type Props = {
  todoList: TodoListType;
};

export default function TodoList({ todoList }: Props) {
  const { isLoading, data: todoItems } = useTodoItems(todoList.id);
  const { filteredTodoItems, filter, setFilter, search, setSearch } =
    useFilteredTodoItems(todoItems);

  return (
    <div className="w-full p-2 border sm:p-4">
      <h2 className="text-3xl text-center">{todoList.name}</h2>
      <ul>
        {isLoading ? (
          <h3 className="text-center">Loading...</h3>
        ) : (
          <>
            <TodoListFilter value={filter} setValue={setFilter} />
            <TodoListSearch value={search} setValue={setSearch} />
            <div className="flex flex-col mt-2 gap-y-2">
              {filteredTodoItems?.map((todoItem) => (
                <TodoItem key={todoItem.id} todoItem={todoItem} />
              )) ?? <h3 className="text-2xl text-center">No tasks found</h3>}
            </div>
          </>
        )}
      </ul>
      <AddTodoItemForm todoListId={todoList.id} />
    </div>
  );
}
