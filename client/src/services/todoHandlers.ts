import { Todo } from "../context/TodoContext";
import {
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  SET_TODOS,
} from "../context/todoReducer";
import {
  addTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../services/todoService";

// Define the handlers
export const fetchTodosHandler = async (dispatch: any) => {
  try {
    const todos = await getTodos();
    dispatch({ type: SET_TODOS, payload: todos });
  } catch (error) {
    console.error("Failed to fetch todos:", error);
  }
};

export const addTodoHandler = async (todo: Todo, dispatch: any) => {
  try {
    const newTodo = await addTodo(todo);
    dispatch({ type: ADD_TODO, payload: newTodo });
  } catch (error) {
    console.error("Failed to add todo:", error);
  }
};

export const deleteTodoHandler = async (id: string, dispatch: any) => {
  try {
    await deleteTodo(id);
    dispatch({ type: DELETE_TODO, payload: id });
  } catch (error) {
    console.error("Failed to delete todo:", error);
  }
};

export const updateTodoHandler = async (todo: Todo, dispatch: any) => {
  try {
    const updatedTodo = await updateTodo(todo);
    dispatch({ type: UPDATE_TODO, payload: updatedTodo });
  } catch (error) {
    console.error("Failed to update todo:", error);
  }
};
