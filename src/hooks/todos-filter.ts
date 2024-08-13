import { TodoItem } from "@/hooks/data/todo-item";
import { useMemo, useState } from "react";

export const FILTER_OPTIONS = [
  { name: "Show all tasks", value: "all" },
  { name: "Show active tasks", value: "active" },
  { name: "Show completed tasks", value: "completed" },
] as const;

export type FilterValueOptions = (typeof FILTER_OPTIONS)[number]["value"];
export const useFilteredTodoItems = (todoItems: TodoItem[] | undefined) => {
  const [filter, setFilter] = useState<FilterValueOptions>("all");
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
