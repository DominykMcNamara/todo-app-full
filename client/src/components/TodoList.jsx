import React, { useEffect, useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import List from "@mui/material/List";
import { Box } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import { useTheme } from "@mui/material";
import Divider from "@mui/material/Divider";
import { Counter } from "./Counter";
import { TodoItem } from "./TodoItem";
import TodoApi from "../apis/Todo.api";
import { Typography } from "@mui/material";
import { Filter } from "./Filter";

export const TodoList = (props) => {
  const { todos, setTodos, filter } = useContext(TodoContext);
  const theme = useTheme();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todoList = await TodoApi.get("/");
        if (!todoList) {
          return
        }
        setTodos(todoList.data.data.todos);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTodos();
  }, [todos, setTodos]);

  const handleDeleteCompleted = async (e) => {
    e.preventDefault();
    try {
      await TodoApi.delete("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <List
      sx={{
        margin: {desktop: "30px auto", tablet:"30px auto", mobile: "24px auto"},
        borderRadius: "5px",
        borderColor: theme.palette.info.main,
        backgroundColor: theme.palette.common.white,
        boxShadow: `0px 35px 50px -15px ${theme.palette.warning.main}`

      }}
    >
      {todos.length === 0 && (
        <Typography
          color={theme.palette.error.main}
          textAlign={"center"}
          sx={{ fontStyle: "bold" }}
        >
          Please enter a todo to begin
        </Typography>
      )}
      {todos &&
        filter === "all" &&
        todos.map((todo) => {
          return (
            <>
              <ListItem key={todo.id}>
                <TodoItem todo={todo} />
              </ListItem>
              <Divider />
            </>
          );
        })}

      {todos &&
        filter === "active" &&
        todos.map((todo) => {
          if (todo.completed !== true) {
            return (
              <>
                <ListItem key={todo.id}>
                  <TodoItem todo={todo} />
                </ListItem>
                <Divider />
              </>
            );
          }
        })}

      {todos &&
        filter === "completed" &&
        todos.map((todo) => {
          if (todo.completed === true) {
            return (
              <>
                <ListItem key={todo.id}>
                  <TodoItem todo={todo} />
                </ListItem>
                <Divider />
              </>
            );
          }
        })}
      <Box
        sx={{
          paddingLeft: "24px",
          paddingRight: "24px",
          paddingTop: "14px",
          paddingBottom: "14px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          color: theme.palette.secondary.main,
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <Box>
          <Counter />
        </Box>
        <Box>
          <Filter />
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: {mobile: "14px"},
              "&:hover": {
                color: theme.palette.action.main,
              },
            }}
            onClick={(e) => handleDeleteCompleted(e)}
          >
            Clear Completed
          </Typography>
        </Box>
      </Box>
    </List>
  );
};
