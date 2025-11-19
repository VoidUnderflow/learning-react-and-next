import { Item } from "./App";

const API = "http://localhost:3000";

export async function fetchTodos(): Promise<Item[]> {
  const res = await fetch(`${API}/api/todos`);
  if (!res.ok) {
    throw new Error("Error fetching todos");
  }
  return res.json();
}

export async function createTodo(text: string): Promise<Item> {
  const res = await fetch(`${API}/api/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, status: "active" }),
  });

  if (!res.ok) {
    throw new Error("Error creating todo");
  }

  return res.json();
}

export async function updateTodo(
  id: number,
  data: Partial<Pick<Item, "status">>
): Promise<Item> {
  const res = await fetch(`${API}/api/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error updating todo");
  }

  return res.json();
}

export async function deleteTodo(id: number): Promise<void> {
  const res = await fetch(`${API}/api/todos/${id}`, { method: "DELETE" });
  if (!res.ok) {
    throw new Error("Error deleting todo.");
  }
}

export async function deleteCompleted(): Promise<void> {
  const res = await fetch("http://localhost:3000/api/todos/completed", {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Error deleting completed TODOs");
  }
}
