import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./Home";
import { MainContextProvider } from "../contexts/MainContext";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch location={location}>
        <MainContextProvider>
          <Route exact path="/" component={Home} />
        </MainContextProvider>
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
