import { useState } from "react";
import { Box, Flex, Stack, Button, Input } from "@chakra-ui/react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function App() {
  const queryClient = useQueryClient();
  const [newTodoTitle, setNewTodoTitle] = useState("");
  console.log(newTodoTitle);

  // Get All todos
  const getTodosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = axios.get("http://localhost:5000/api/todo");
      return res;
    },
  });

  // Add a Todo
  const createTodoMutation = useMutation({
    mutationKey: ["add todo"],
    mutationFn: async (newTodo) => {
      console.log(newTodo);
      await axios.post("http://localhost:5000/api/todo", newTodo);
    },
    // refetch the todos query after the mutation succeeds
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  /**
   * Callback run when the user clicks the "Add Todo" button
   *
   * This function adds a todo by using the mutation above then resets
   * the input field to an empty string
   * @param {Object} newTodo
   * @param {string} newTodo.title The title of the todo
   * @param {boolean} newTodo.completed is it complete?
   */
  const handleAddTodo = (newTodo) => {
    createTodoMutation.mutate({
      title: newTodoTitle,
      completed: false,
    });
    setNewTodoTitle("");
  };

  return (
    <Box padding={"1rem"}>
      <Stack>
        <Flex>
          <Input
            placeholder="Give it a title"
            marginRight={"10px"}
            flex={1}
            variant="flushed"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
          />
          <Button onClick={handleAddTodo}>Add New Todo</Button>
        </Flex>
        <br></br>
        <Box>Your Todos:</Box>
      </Stack>
    </Box>
  );
}

export default App;
