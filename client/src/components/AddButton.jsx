import React from "react";
import ButtonUnstyled, {
  buttonUnstyledClasses,
} from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/system";
import TodoApi from "../apis/Todo.api";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material";
const AddTodo = styled(ButtonUnstyled)`
  border: 1px solid #e3e4f1;
  height: 24px;
  width: 24px;
  border-radius: 100%;
  cursor: pointer;
  margin-left: 10px;
  margin-right: 10px;
  background-color: #ffffff;

  &:focus {
    background: linear-gradient(135deg, #55ddff 0%, #c058f3 100%);
  }
`;

export const AddButton = ({ todo }) => {
  const theme = useTheme()
  const handleSubmitTodo = async (e) => {
    e.preventDefault();
    const trimmedTodo = todo.trim()
    if (trimmedTodo.length === 0) {
      return
    }
    const newTodo = await TodoApi.post("/", {
      description: trimmedTodo,
    });
    console.log(newTodo);
  };
  return (
    <AddTodo disabled={todo ? false : true} sx={{backgroundColor: theme.palette.common.white, borderColor: theme.palette.info.main}}>
      <AddIcon
        onClick={(e) => handleSubmitTodo(e)}
        sx={{ color: theme.palette.common.white, width: "20px", height: "20px" }}
      />
    </AddTodo>
  );
};
