import { AddTodoItemFormValues } from "@/components/todo-item/add-todo-item-form";
import { TODO_LISTS_KEY } from "@/hooks/data/todo-lists";
import { API_URL } from "@/lib/react-query";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";

const TODO_ITEMS_KEY = "todo_items";
export type TodoItem = {
  id: string;
  todo_listId: string;
  title: string;
  description: string;
  due_date?: Date | null;
  is_completed: boolean;
  is_pending?: boolean;
};

function getUrl(todoListId: string) {
  return `${API_URL}/${TODO_LISTS_KEY}/${todoListId}/${TODO_ITEMS_KEY}`;
}

export const useTodoItems = (todoListId: string) => {
  return useQuery({
    queryKey: [TODO_ITEMS_KEY, todoListId],
    queryFn: async () => {
      const { data } = await axios.get<TodoItem[]>(getUrl(todoListId));
      return data;
    },
  });
};

export const useTodoItemAddMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (todoItem: AddTodoItemFormValues) => {
      const newTodoItem: TodoItem = {
        ...todoItem,
        is_pending: true,
        id: Math.random().toString(36),
      };

      queryClient.setQueryData<TodoItem[] | undefined>(
        [TODO_ITEMS_KEY, todoItem.todo_listId],
        (data) => {
          if (!data) return data;
          return [...data, newTodoItem];
        }
      );

      await axios.post(getUrl(todoItem.todo_listId), todoItem);
      return newTodoItem;
    },
    onSuccess: (todoItem) => {
      queryClient.invalidateQueries({
        queryKey: [TODO_ITEMS_KEY, todoItem.todo_listId],
      });
    },
    onError: (_, todoItem) => {
      queryClient.invalidateQueries({
        queryKey: [TODO_ITEMS_KEY, todoItem.todo_listId],
      });
    },
  });
};

function toggleTodoItemCompletion(
  queryClient: QueryClient,
  todoItem: TodoItem
) {
  queryClient.setQueryData(
    [TODO_ITEMS_KEY, todoItem.todo_listId],
    (data: TodoItem[] | undefined) => {
      if (!data) return data;
      return data.map((item) =>
        item.id === todoItem.id
          ? { ...item, is_completed: !item.is_completed }
          : item
      );
    }
  );
}

export const useTodoItemToggleCompleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (todoItem: TodoItem) => {
      toggleTodoItemCompletion(queryClient, todoItem);

      await axios.put(`${getUrl(todoItem.todo_listId)}/${todoItem.id}`, {
        ...todoItem,
        is_completed: !todoItem.is_completed,
      });

      return todoItem;
    },
    onError: (_, todoItem) => {
      toggleTodoItemCompletion(queryClient, todoItem);
    },
  });
};

export const useTodoItemDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (todoItem: TodoItem) => {
      queryClient.setQueryData(
        [TODO_ITEMS_KEY, todoItem.todo_listId],
        (data: TodoItem[] | undefined) => {
          if (!data) return data;
          return data.filter((item) => item.id !== todoItem.id);
        }
      );

      await axios.delete(`${getUrl(todoItem.todo_listId)}/${todoItem.id}`);
      return todoItem;
    },
    onError: (_, data) => {
      queryClient.invalidateQueries({
        queryKey: [TODO_ITEMS_KEY, data.todo_listId],
      });
    },
  });
};
