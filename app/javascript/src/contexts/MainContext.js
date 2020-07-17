import React, { createContext, useEffect, useReducer } from "react";
import { initialState, reducer } from "../services/mainReducer";

const MainContext = createContext();

const MainContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MainContext.Provider
      value={{
        newEntryDialogOpen: state.newEntryDialogOpen,
        updateEntryDialogOpen: state.updateEntryDialogOpen,
        dispatch,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export { MainContext, MainContextProvider };
