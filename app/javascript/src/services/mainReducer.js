import { SET_NEW_ENTRY_DIALOG_OPEN } from "./mainActions";

const initialState = {
  newEntryDialogOpen: null,
  updateEntryDialogOpen: { id: null, kind: null },
  snack: { message: null, status: null },
};

function reducer(state, action) {
  switch (action.type) {
    case SET_SUCCESS_SNACK:
      return { ...state, snack: { message: action.message, status: "success" } };
    case SET_ERROR_SNACK:
      return { ...state, snack: { message: action.message, status: "error" } };
    case SET_INFO_SNACK:
      return { ...state, snack: { message: action.message, status: "info" } };
    case UNSET_SNACK:
      return { ...state, snack: { message: null, status: null } };

    case SET_NEW_ENTRY_DIALOG_OPEN:
      return { ...state, newEntryDialogOpen: action.kind };
    case CLOSE_NEW_ENTRY_DIALOG:
      return { ...state, newEntryDialogOpen: null };
    case SET_UPDATE_ENTRY_DIALOG_OPEN:
      return { ...state, updateEntryDialogOpen: { entry: action.entry, kind: action.kind } };
    case CLOSE_UPDATE_ENTRY_DIALOG:
      return { ...state, updateEntryDialogOpen: { entry: null, kind: null } };
    default:
      throw new Error();
  }
}

export { initialState, reducer };
