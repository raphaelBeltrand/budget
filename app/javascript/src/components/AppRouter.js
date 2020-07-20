import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./Home";
import Layout from "./Layout";
import { MainContextProvider } from "../contexts/MainContext";
import useCurrentSession from "./useCurrentSession";
import Login from "./Login";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_SESSION } from "../queries/globalQueries";
import { CircularProgress } from "@material-ui/core";

const AppRouter = (props) => {
  const { data, loading, error } = useQuery(GET_SESSION, { fetchPolicy: "cache-first" });

  if (loading) return <CircularProgress />;

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
          <Route exact path="/" component={() => <Login />} />
        )}
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
