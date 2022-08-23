import React, { useEffect, useContext } from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import TodoApi from "../apis/Todo.api";
import { TodoContext } from "../context/TodoContext";

export const Counter = (props) => {
  const { numberOfIncompletedTodos, setNumberOfIncompletedTodos } =
    useContext(TodoContext);
  const theme = useTheme();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const inCompletedTodos = await TodoApi.get("/completed");
        setNumberOfIncompletedTodos(
          inCompletedTodos.data.data.numberOfIncompletedTodos
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  });
  return (
    <Box>
      <Typography
        sx={{ fontSize: { mobile: "14px" } }}
        color={theme.palette.secondary.main}
      >
        {numberOfIncompletedTodos} Items left
      </Typography>
    </Box>
  );
};
