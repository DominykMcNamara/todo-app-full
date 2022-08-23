import React, { useEffect, useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import { Box, Typography } from "@mui/material";
import {useTheme}  from "@mui/material";

export const Filter = () => {
  const { filter, setFilter } = useContext(TodoContext);
  const theme = useTheme();
  const handleFilterChange = (e, filter) => {
    e.preventDefault();
    if (filter === "all") {
      setFilter("all");
    } else if (filter === "active") {
      setFilter("active");
    } else if (filter === "completed") {
      setFilter("completed");
    }
    console.log(filter);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Typography
          onClick={(e) => handleFilterChange(e, "all")}
          sx={{
            color: filter === "all" ? theme.palette.action.main : "",
            marginRight: "10px",
            fontSize: {mobile: "14px"},
            "&:hover": {
              color: theme.palette.action.main,
            },
          }}
        >
          {" "}
          All{" "}
        </Typography>
        <Typography
          onClick={(e) => handleFilterChange(e, "active")}
          sx={{
            color: filter === "active" ? theme.palette.action.main : "",
            fontSize: {mobile: "14px"},
            marginRight: "10px",
            "&:hover": {
              color: theme.palette.action.main,
            },
          }}
        >
          {" "}
          Active{" "}
        </Typography>
        <Typography
          onClick={(e) => handleFilterChange(e, "completed")}
          sx={{
            color: filter === "completed" ?theme.palette.action.main: "",
            marginRight: "10px",
            
            "&:hover": {
              color: theme.palette.action.main,
            },
          }}
        >
          {" "}
          Completed{" "}
        </Typography>
      </Box>
    </>
  );
};
