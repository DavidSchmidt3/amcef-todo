import { TodoItem } from "@/hooks/data/todo-item";
import { useMemo, useState } from "react";

export type FilterOptions = "all" | "active" | "completed";
export const useFilteredTodoItems = (todoItems: TodoItem[] | undefined) => {
  const [filter, setFilter] = useState<FilterOptions>("all");
  const [search, setSearch] = useState("");

  const filteredTodoItems = useMemo(
    () =>
      todoItems
        ?.filter((todoItem) => {
          if (filter === "active") return !todoItem.is_completed;
          if (filter === "completed") return todoItem.is_completed;
          return true;
        })
        .filter(
          (todoItem) =>
            todoItem.title.toLowerCase().includes(search.toLowerCase()) ||
            todoItem.description.toLowerCase().includes(search.toLowerCase())
        ),
    [todoItems, filter, search]
  );

  return {
    filteredTodoItems,
    filter,
    setFilter,
    search,
    setSearch,
  };
};
