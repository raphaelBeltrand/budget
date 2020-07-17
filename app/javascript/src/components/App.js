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
        main: "#0c8cff",
      },
      secondary: {
        main: "#fe94d0",
      },
      danger: {
        main: "#ff6666",
      },
      positive: {
        main: "#1CFA55",
      },
      negative: {
        main: "#FA1C5F",
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
