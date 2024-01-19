import axios from "axios";

export const getTodos = async () => {
  const res = axios.get("http://localhost:5000/api/todo");
  return res;
};

export const createTodo = async (newTodo) => {
  await axios.post("http://localhost:5000/api/todo", newTodo);
};
