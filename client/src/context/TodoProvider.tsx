import React, { ReactNode, useEffect, useReducer } from "react";
import { Todo, TodoContext } from "./TodoContext";
import { todoReducer } from "./todoReducer";
import {
  fetchTodosHandler,
  addTodoHandler,
  deleteTodoHandler,
  updateTodoHandler,
} from "../services/todoHandlers";

const initialState = {
  filterStatus: "all",
  todos: [] as Todo[],
};

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // Fetch todos on mount
  useEffect(() => {
    fetchTodosHandler(dispatch);
  }, []);

  return (
    <TodoContext.Provider
      value={{
        state,
        dispatch,
        addTodoHandler: (todo: Todo) => addTodoHandler(todo, dispatch),
        deleteTodoHandler: (id: string) => deleteTodoHandler(id, dispatch),
        updateTodoHandler: (todo: Todo) => updateTodoHandler(todo, dispatch),
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
