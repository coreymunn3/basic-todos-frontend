import React from "react";
import { Flex, Spacer, Checkbox } from "@chakra-ui/react";

const TodoItem = (props) => {
  console.log(props);
  const { title, completed, id } = props;
  return (
    <Flex key={id}>
      <Checkbox colorScheme="green" value={completed}>
        {title}
      </Checkbox>
    </Flex>
  );
};

export default TodoItem;
