import { Box, Stack } from "@chakra-ui/react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function App() {
  const todosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = axios.get("http://localhost:5000/api/todo");
      return res.data;
    },
  });

  return (
    <Box>
      <Stack>
        <Box>Hello</Box>
        <Box>How Are You</Box>
      </Stack>
    </Box>
  );
}

export default App;
