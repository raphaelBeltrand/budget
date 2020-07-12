const ROOT = "MAIN";

export const SET_ENTRY_DIALOG_OPEN = `${ROOT}/SET_ENTRY_DIALOG_OPEN`;

export const setEntryDialogOpen = (kind) => ({
  type: SET_ENTRY_DIALOG_OPEN,
  kind,
});
