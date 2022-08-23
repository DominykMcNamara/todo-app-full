import React from "react";
import ButtonUnstyled, {
  buttonUnstyledClasses,
} from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/system";
import CheckIcon from "@mui/icons-material/Check";
import { useTheme } from "@mui/material";

const CompleteTodo = styled(ButtonUnstyled)`
  border: 1px solid #e3e4f1;
  height: 24px;
  width: 24px;
  border-radius: 100%;
  cursor: pointer;
  margin-left: 10px;
  margin-right: 10px;
  &:focus {
    background: linear-gradient(135deg, #55ddff 0%, #c058f3 100%);
  }
`;

export const CompleteTodoButton = ({ completed }) => {
  const theme = useTheme()
  return (
    <CompleteTodo sx={{backgroundColor: theme.palette.common.white, borderColor: theme.palette.info.main}}>
      {completed && (
        <CheckIcon sx={{ color: theme.palette.common.white, width: "20px", height: "20px" }} />
      )}
    </CompleteTodo>
  );
};
