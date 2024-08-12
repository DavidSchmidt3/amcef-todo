import { AddTodoListFormValues } from "@/components/todo-list/add-todo-list-form";
import { API_URL, queryClient } from "@/lib/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const TODO_LISTS_KEY = "todo_lists";
export type FilterOptions = "all" | "active" | "completed";
export type TodoList = {
  id: string;
  name: string;
};

export const useTodoLists = () => {
  return useQuery({
    queryKey: [TODO_LISTS_KEY],
    queryFn: async () => {
      const { data } = await axios.get<TodoList[]>(
        `${API_URL}/${TODO_LISTS_KEY}`
      );
      return data;
    },
  });
};

export const useTodoListAddMutation = () => {
  return useMutation({
    mutationFn: async (todoList: AddTodoListFormValues) => {
      await axios.post(`${API_URL}/${TODO_LISTS_KEY}`, todoList);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TODO_LISTS_KEY] });
    },
  });
};
