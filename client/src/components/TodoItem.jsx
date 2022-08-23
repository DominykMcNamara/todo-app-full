import React, { useState } from "react";
import { Box } from "@mui/system";
import { CompleteTodoButton } from "./CompleteTodoButton";
import { Button, Typography } from "@mui/material";
import TodoApi from "../apis/Todo.api";
import {useTheme} from "@mui/material";

export const TodoItem = ({ todo }) => {
  const [completed, setCompleted] = useState(false);
  const theme = useTheme()
  
  const handleComplete = async (e, id) => {
    e.preventDefault();
    setCompleted(true);
    try {
      await TodoApi.put(`/${id}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Box onClick={(e) => handleComplete(e, todo.id)}>
        <CompleteTodoButton completed={completed} />
      </Box>
      <Typography
        sx={{
          textDecoration: todo.completed ? "line-through" : "none",
          color: todo.completed ? theme.palette.error.main : theme.palette.common.black,
        }}
      >
        {todo.description}
      </Typography>
    </>
  );
};
