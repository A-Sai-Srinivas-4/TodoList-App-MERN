import { createContext, useContext } from "react"; // Import createContext

// Define the structure of a single todo item
export interface Todo {
  _id?: string;
  title: string;
  status: string;
  time: string;
}
// Explanation: Todo is a structure that holds an id, task, and completion status

// Define the state structure
interface TodoState {
  filterStatus: string;
  todos: Todo[];
}
// Explanation: TodoState is a structure that holds an array of todos

// Define the context structure
interface TodoContextType {
  state: TodoState;
  dispatch: React.Dispatch<any>;
  addTodoHandler: (todo: Todo) => Promise<void>;
  deleteTodoHandler: (id: string) => Promise<void>;
  updateTodoHandler: (todo: Todo) => Promise<void>;
}
// Explanation: TodoContextType is a React context that provides a way to share state between components

// Create the TodoContext
export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);
// Explanation : TodoContext is a React context that provides a way to share state between components

// Custom hook to use TodoContext
export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};
// Explanation : useTodoContext is a custom hook that returns the value of the TodoContext and throws an error if it's not used within a TodoProvider component
