import { SET_ENTRY_DIALOG_OPEN } from "./mainActions";

const initialState = {
  entryDialogOpen: null,
};

function reducer(state, action) {
  switch (action.type) {
    case SET_ENTRY_DIALOG_OPEN:
      return { ...state, entryDialogOpen: action.kind };
    default:
      throw new Error();
  }
}

export { initialState, reducer };
