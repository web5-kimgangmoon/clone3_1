"use client";

import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: '"Mona Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face{
          font-family: '"Mona Sans", "Helvetica Neue", Helvetica, Arial, sans-serif';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
        }
        `,
    },
  },
});
