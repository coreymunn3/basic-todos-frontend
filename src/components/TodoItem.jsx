import React, { useState, useRef } from "react";
import {
  Flex,
  Stack,
  Spacer,
  Checkbox,
  IconButton,
  Divider,
  Popover,
  PopoverArrow,
  PopoverTrigger,
  PopoverHeader,
  PopoverContent,
  PopoverCloseButton,
  PopoverBody,
  Input,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import {
  EditIcon,
  DeleteIcon,
  CheckIcon,
  TriangleUpIcon,
  TriangleDownIcon,
} from "@chakra-ui/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editTodo, deleteTodo } from "../api";

const TodoItem = (props) => {
  const { todo } = props;
  const toast = useToast();
  const queryClient = useQueryClient();

  const [newTitle, setNewTitle] = useState(todo.title);
  const initRef = useRef();

  const editTodoMutation = useMutation({
    mutationKey: ["edit todo"],
    mutationFn: editTodo,
    onSuccess: () => {
      toast({
        title: "Updated successfully",
        variant: "subtle",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: () => {
      toast({
        title: "Unable to delete the Todo",
        variant: "subtle",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const deleteTodoMutation = useMutation({
    mutationKey: ["delete todo"],
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: () => {
      toast({
        title: "Unable to delete the Todo",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const handleEditTodo = (todo) => {
    editTodoMutation.mutate(todo);
  };

  const handleDeleteTodo = (id) => {
    deleteTodoMutation.mutate(id);
  };

  const handleUpdateTitle = (e) => {
    setNewTitle(e.target.value);
  };

  const handleUpdateCheck = (e) => {
    handleEditTodo({
      ...todo,
      completed: e.target.checked,
    });
  };

  return (
    <>
      <Flex>
        <Stack direction={"row"} justifyContent="center" alignItems={"center"}>
          <Flex direction="column" marginRight={"0.5rem"}>
            <Tooltip label="Move Up">
              <IconButton
                variant={"ghost"}
                color={"gray.300"}
                size="xxs"
                icon={<TriangleUpIcon />}
              />
            </Tooltip>
            <Tooltip label="Move Down">
              <IconButton
                variant={"ghost"}
                color={"gray.300"}
                size="xxs"
                icon={<TriangleDownIcon />}
              />
            </Tooltip>
          </Flex>
          <Checkbox
            size={"lg"}
            defaultChecked={todo.completed}
            onChange={handleUpdateCheck}
          >
            {todo.title}
          </Checkbox>
        </Stack>
        <Spacer />
        <Stack direction={"row"}>
          <Popover initialFocusRef={initRef}>
            {({ isOpen, onClose }) => (
              <>
                <PopoverTrigger>
                  <IconButton icon={<EditIcon />} />
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>Edit</PopoverHeader>
                  <PopoverBody>
                    <Stack direction={"row"}>
                      <Input value={newTitle} onChange={handleUpdateTitle} />
                      <IconButton
                        icon={<CheckIcon />}
                        colorScheme="green"
                        onClick={() => {
                          handleEditTodo({
                            ...todo,
                            title: newTitle,
                          });
                          onClose();
                        }}
                      />
                    </Stack>
                  </PopoverBody>
                </PopoverContent>
              </>
            )}
          </Popover>
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDeleteTodo(todo.id)}
          />
        </Stack>
      </Flex>
      <Divider />
    </>
  );
};

export default TodoItem;
