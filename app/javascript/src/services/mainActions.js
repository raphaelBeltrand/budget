const ROOT = "MAIN";

export const SET_NEW_ENTRY_DIALOG_OPEN = `${ROOT}/SET_NEW_ENTRY_DIALOG_OPEN`;
export const CLOSE_NEW_ENTRY_DIALOG = `${ROOT}/CLOSE_NEW_ENTRY_DIALOG`;
export const SET_UPDATE_ENTRY_DIALOG_OPEN = `${ROOT}/SET_UPDATE_ENTRY_DIALOG_OPEN`;
export const CLOSE_UPDATE_ENTRY_DIALOG = `${ROOT}/CLOSE_UPDATE_ENTRY_DIALOG`;
export const SET_SUCCESS_SNACK = `${ROOT}/SET_SUCCESS_SNACK`;
export const SET_ERROR_SNACK = `${ROOT}/SET_ERROR_SNACK`;
export const SET_INFO_SNACK = `${ROOT}/SET_INFO_SNACK`;
export const UNSET_SNACK = `${ROOT}/UNSET_SNACK`;
export const SHOULD_REFRESH = `${ROOT}/SHOULD_REFRESH`;
export const SHOULD_REFRESH_OFF = `${ROOT}/SHOULD_REFRESH_OFF`;

export const setNewEntryDialogOpen = (kind) => ({
  type: SET_NEW_ENTRY_DIALOG_OPEN,
  kind,
});

export const closeNewEntryDialog = () => ({
  type: SET_NEW_ENTRY_DIALOG_OPEN,
});

export const setUpdateEntryDialogOpen = (entry, kind) => ({
  type: SET_UPDATE_ENTRY_DIALOG_OPEN,
  entry,
  kind,
});

export const closeUpdateEntryDialog = () => ({
  type: CLOSE_UPDATE_ENTRY_DIALOG,
});

export const setSuccessSnack = (message) => ({
  type: SET_SUCCESS_SNACK,
  message: message,
});

export const setErrorSnack = (message) => ({
  type: SET_ERROR_SNACK,
  message: message,
});

export const setInfoSnack = (message) => ({
  type: SET_INFO_SNACK,
  message: message,
});

export const unsetSnack = () => ({
  type: UNSET_SNACK,
});

export const shouldRefresh = () => ({
  type: SHOULD_REFRESH,
});

export const shouldRefreshOff = () => ({
  type: SHOULD_REFRESH_OFF,
});
