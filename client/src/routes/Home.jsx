import React, { useState, useContext, useMemo, createContext } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Container } from "@mui/system";
import { Typography } from "@mui/material";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { AddTodo } from "../components/AddTodo";
import { TodoList } from "../components/TodoList";
import LightBackground from "../assets/bg-desktop-light.jpg";
import DarkBackground from "../assets/bg-desktop-dark.jpg"
import { lightTheme, darkTheme } from "../styles/styles";

export const Home = () => {
  const [darkMode, setDarkMode] = useState();
  const theme = darkMode ? darkTheme : lightTheme;
  const Background = darkMode ? DarkBackground : LightBackground
  const handleModeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Container
          id="app"
          maxWidth="true"
          disableGutters={true}
          sx={{
            backgroundColor: theme.palette.primary.main,
            height: "100vh",
          }}
        >
          <Box
            component="header"
            sx={{
              backgroundImage: `url(${Background})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              height:{mobile: "200px",  desktop: "300px"},
              width: "100vw",
              
            }}
          >
            <Box
              className="header-content"
              sx={{
                display: "flex",
                flexDirection: "row",
                width: {desktop: "541px", laptop: "600px", tablet: "700px"},
                justifyContent: {desktop: "space-between", laptop: "space-between", tablet: "space-evenly"},
                alignItems: "center",
                margin: "0 auto",
                paddingTop: "81px",
                paddingRight: "30px",
                
              }}
            >
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontFamily: "Josefin Sans",
                  fontStyle: "bold",
                  color: "#fff",
                  letterSpacing: "15px",
                  fontSize:{desktop: "40px", laptop: "30px", mobile: "25px", tablet: "30px"},
                  lineHeight: "40px",
                  marginLeft: {mobile: "26px"}
                }}
              >
                TODO
              </Typography>
              <IconButton
                sx={{
                  color: "#fff",
                  height: {desktop: "21px"},
                  width: "21px",
                  marginLeft: {mobile: "170px"}
                }}
                onClick={handleModeChange}
              >
                {theme.palette.mode === "light" ? (
                  <DarkModeIcon />
                ) : (
                  <LightModeIcon />
                )}
              </IconButton>
            </Box>
          </Box>
          <Box
            component="section"
            sx={{ position: "relative", bottom: "100px" }}
          >
            <AddTodo />
          </Box>
          <Box
            component="section"
            sx={{
              position: "relative",
              bottom: "100px",
              width: {desktop: "540px", laptop: "540px", tablet: "440px", mobile: "327px"},
              margin: "0 auto",
            }}
          >
            <TodoList />
          </Box>
        </Container>
      </CssBaseline>
    </ThemeProvider>
  );
};
