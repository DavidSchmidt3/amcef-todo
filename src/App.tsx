import Navbar from "@/components/navbar";
import Providers from "@/components/providers";
import TodoLists from "@/components/todo-list/todo-lists";

export default function App() {
  return (
    <Providers>
      <Navbar />
      <TodoLists />
    </Providers>
  );
}
