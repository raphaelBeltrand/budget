import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./Home";
import Layout from "./Layout";
import { MainContextProvider } from "../contexts/MainContext";
import useCurrentSession from "./useCurrentSession";
import Login from "./LoginDesktop";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_SESSION } from "../queries/globalQueries";
import { CircularProgress, withWidth, isWidthUp } from "@material-ui/core";
import LoginMobile from "./LoginMobile";
import LoginPage from "./LoginPage";

const AppRouter = () => {
  const { data, loading, error } = useQuery(GET_SESSION, { fetchPolicy: "cache-first" });

  if (loading) return null;

  return (
    <BrowserRouter>
      <Switch location={location}>
        {data && data.session ? (
          <MainContextProvider>
            <>
              <Layout />
              <Route exact path="/" component={() => <Home />} />
            </>
          </MainContextProvider>
        ) : (
          <Route exact path="/" component={() => <LoginPage />} />
        )}
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
