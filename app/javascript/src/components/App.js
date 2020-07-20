import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ApolloProvider, useQuery } from "@apollo/client";

import apolloClient from "../apolloClient";
import AppRouter from "./AppRouter";

const makeTheme = (type) => {
  const background = { paper: "#fefefe", default: "#fff" };

  return createMuiTheme({
    typography: {
      useNextVariants: true,
      fontFamily: `'Londrina Solid', cursive;`,
      fontWeight: 300,
      h4: {
        fontWeight: 100,
      },
      h6: {
        fontWeight: 300,
      },
    },
    html: {
      fontSize: "16px",
      fontWeight: 200,
    },
    palette: {
      background,
      primary: {
        main: "#858DFF",
      },
      secondary: {
        main: "#FFE06B",
      },
      danger: {
        main: "#FF3D3B",
      },
      type: type,
    },
    overrides: {
      MuiTooltip: {
        tooltip: {
          fontSize: "1em",
        },
      },
      MuiInputBase: {
        root: {
          "& input": {
            fontWeight: 300,
          },
        },
        input: {
          fontWeight: 300,
        },
      },
      MuiSelect: {
        root: {
          "& input": {
            fontWeight: 300,
          },
        },
      },
    },
  });
};

export default () => {
  return (
    <ApolloProvider client={apolloClient}>
      <MuiThemeProvider theme={makeTheme("light")}>
        <CssBaseline />
        <AppRouter />
      </MuiThemeProvider>
    </ApolloProvider>
  );
};
