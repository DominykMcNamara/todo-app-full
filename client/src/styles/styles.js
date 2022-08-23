import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 768,
      laptop: 1024,
      desktop: 1200,
    },
  },
  palette: {
    mode: "light",
    common: {
      white: "#fff",
      black: "#494C6B",
    },
    primary: {
      main: "#FAFAFA",
    },
    secondary: {
      main: "#9495A5",
    },
    error: {
      main: "#D1D2DA",
    },
    action: {
      main: "#3A7CFD",
    },
    info: {
      main: "#E3E4F1",
    },
    warning: {
        main: "rgba(194, 195, 214, 0.5)"
    },
    
  },
});

export const darkTheme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 768,
      laptop: 1024,
      desktop: 1200,
    },
  },
  palette: {
    mode: "dark",
    common: {
      white: "#25273D",
      black: "#C8CBE7",
    },
    primary: {
      main: "#171823",
    },
    secondary: {
      main: "#5B5E7E",
    },
    error: {
      main: "#4D5067",
    },
    action: {
      main: "#3A7CFD",
    },
    info: {
      main: "#393A4B",
    },
    warning: {
        main: "rgba(0, 0, 0, 0.5)",
      },
      
  },
});
