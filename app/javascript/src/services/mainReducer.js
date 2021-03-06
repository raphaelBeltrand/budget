import {
  SET_NEW_ENTRY_DIALOG_OPEN,
  SET_SUCCESS_SNACK,
  SET_ERROR_SNACK,
  SET_INFO_SNACK,
  UNSET_SNACK,
  CLOSE_NEW_ENTRY_DIALOG,
  SET_UPDATE_ENTRY_DIALOG_OPEN,
  CLOSE_UPDATE_ENTRY_DIALOG,
  SHOULD_REFRESH,
  SHOULD_REFRESH_OFF,
  SET_ENTRY_TO_DELETE,
  UNSET_ENTRY_TO_DELETE,
  OPEN_DRAWER,
  CLOSE_DRAWER,
  SET_DRAWER_YEAR,
  OPEN_MY_ACCOUNT_DIALOG,
  CLOSE_MY_ACCOUNT_DIALOG,
} from "./mainActions";

const initialState = {
  yearForDrawer: new Date().getFullYear(),
  newEntryDialogOpen: null,
  updateEntryDialogOpen: { entry: null, kind: null },
  snack: { message: null, status: null },
  shouldRefresh: false,
  entryToDelete: null,
  drawerOpen: false,
  myAccountDialogOpen: false,
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

    case SET_ENTRY_TO_DELETE:
      return { ...state, entryToDelete: { entry: action.entry, kind: action.kind } };
    case UNSET_ENTRY_TO_DELETE:
      return { ...state, entryToDelete: { entry: null, kind: null } };

    case SHOULD_REFRESH:
      return { ...state, shouldRefresh: true };
    case SHOULD_REFRESH_OFF:
      return { ...state, shouldRefresh: false };

    case OPEN_DRAWER:
      return { ...state, drawerOpen: true };
    case CLOSE_DRAWER:
      return { ...state, drawerOpen: false };

    case OPEN_MY_ACCOUNT_DIALOG:
      return { ...state, myAccountDialogOpen: true };
    case CLOSE_MY_ACCOUNT_DIALOG:
      return { ...state, myAccountDialogOpen: false };

    case SET_DRAWER_YEAR:
      return { ...state, yearForDrawer: action.year };

    default:
      throw new Error();
  }
}

export { initialState, reducer };
