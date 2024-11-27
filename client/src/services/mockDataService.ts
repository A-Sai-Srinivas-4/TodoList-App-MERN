import { Todo } from "../context/TodoContext";

const API_URL = "http://localhost:5004/todos";

// Fetch todos
export const getTodos = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

// Add a todo
export const addTodo = async (newTodo: Todo) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo),
  });
  return response.json();
};

// Update a todo
export const updateTodo = async (updatedTodo: Todo) => {
  const response = await fetch(`${API_URL}/${updatedTodo.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedTodo),
  });
  return response.json();
};

// Delete a todo
export const deleteTodo = async (id: string) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};
