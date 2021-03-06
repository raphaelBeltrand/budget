import React, { createContext, useEffect, useReducer } from "react";
import { initialState, reducer } from "../services/mainReducer";

const MainContext = createContext();

const MainContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MainContext.Provider
      value={{
        myAccountDialogOpen: state.myAccountDialogOpen,
        yearForDrawer: state.yearForDrawer,
        entryToDelete: state.entryToDelete,
        drawerOpen: state.drawerOpen,
        newEntryDialogOpen: state.newEntryDialogOpen,
        updateEntryDialogOpen: state.updateEntryDialogOpen,
        snack: state.snack,
        shouldRefresh: state.shouldRefresh,
        dispatch,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export { MainContext, MainContextProvider };
