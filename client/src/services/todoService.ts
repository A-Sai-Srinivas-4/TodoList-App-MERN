// src/services/todoService.ts
import toast from "react-hot-toast";
import api from "./api";
import { Todo } from "../context/TodoContext";

// Explanation: Todo is a structure that holds an id, task, and completion status

const API_BASE_URL = "http://localhost:5000/api/todos";
// Explanation: Define the base URL for the API

// Get all todos
export const getTodos = async (): Promise<Todo[]> => {
  try {
    const response = await api.get(API_BASE_URL); // Call your backend API
    if (!response.data || !Array.isArray(response.data)) {
      // Ensure the response is an array
      return [];
    }
    return response.data; // Return the todos
  } catch (error: any) {
    toast.error(`${error}`);
    return []; // Return an empty array if there's an error
  }
};
// Explanation: Get all todos from the server and return them as an array of Todo objects

// Add a new todo
export const addTodo = async (todo: Todo): Promise<Todo> => {
  try {
    const response = await api.post(API_BASE_URL, todo);
    return response.data;
  } catch (error) {
    toast.error(`${error}`);
    throw new Error("Error adding todo");
  }
};
// Explanation: Create a new todo on the server and return the created Todo object

// Remove a todo by ID
export const deleteTodo = async (id: string): Promise<void> => {
  try {
    const response = await api.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    toast.error(`${error}`);
    throw new Error("Error removing todo");
  }
};
// Explanation: Delete a todo by ID from the server

// Update a todo by ID
export const updateTodo = async (todo: Todo): Promise<Todo> => {
  try {
    const response = await api.put(`${API_BASE_URL}/${todo._id}`, todo);
    return response.data;
  } catch (error) {
    toast.error(`${error}`);
    throw new Error("Error updating todo");
  }
};
// Explanation: Update a todo by ID on the server and return the updated Todo object
