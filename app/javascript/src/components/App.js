import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ApolloProvider, useQuery } from "@apollo/client";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import apolloClient from "../apolloClient";
import AppRouter from "./AppRouter";
import themeSelector from "../themeSelector";
import DateFnsUtils from "@date-io/date-fns";

const makeTheme = (type) => {
  const background = { paper: "#fefefe", default: "#fff" };

  return createMuiTheme({
    typography: {
      useNextVariants: true,
      fontFamily: `'Signika', 'sans-serif'`,
      fontWeight: 200,
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
      positive: {
        main: "#36FF73",
      },
      negative: {
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
    },
  });
};

export default () => {
  return (
    <ApolloProvider client={apolloClient}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <MuiThemeProvider theme={makeTheme("light")}>
          <CssBaseline />
          <AppRouter />
        </MuiThemeProvider>
      </MuiPickersUtilsProvider>
    </ApolloProvider>
  );
};
