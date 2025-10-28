"use client"

import React from "react"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider, createTheme } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4338ca",
      contrastText: "#f9fafb",
    },
    secondary: {
      main: "#36c2b4",
      contrastText: "#0f172a",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#101828",
      secondary: "#475467",
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: "var(--font-geist-sans)",
    fontWeightMedium: 600,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "9999px",
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: "var(--radius-lg)",
        },
      },
    },
  },
})

export function AppThemeProvider({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
