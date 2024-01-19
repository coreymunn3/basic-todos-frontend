import axios from "axios";

export const getTodos = async () => {
  const res = axios.get("http://localhost:5000/api/todo");
  return res;
};

export const createTodo = async (newTodo) => {
  await axios.post("http://localhost:5000/api/todo", newTodo);
};

export const editTodo = async (todo) => {
  await axios.put(`http://localhost:5000/api/todo/${todo.id}`);
};

export const deleteTodo = async (todo) => {
  await axios.delete(`http://localhost:5000/api/todo/${todo.id}`);
};
