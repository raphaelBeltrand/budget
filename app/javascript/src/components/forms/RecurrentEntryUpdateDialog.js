import * as React from "react";
import { withStyles, Dialog, DialogTitle } from "@material-ui/core";
import { UPDATE_RECURRENT_ENTRY } from "../../queries/mutations";
import RecurrentEntryForm from "./RecurrentEntryForm";
import { MainContext } from "../../contexts/MainContext";
import { useMutation } from "@apollo/client";
import { shouldRefresh, setSuccessSnack } from "../../services/mainActions";

const styles = (theme) => ({
  flexGrid: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
  },
  flexRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  separator: {
    width: "30%",
  },
  formControl: {
    width: "100%",
  },
});

const RecurrentEntryUpdateDialog = ({ classes, open, onClose, kind }) => {
  const { updateEntryDialogOpen, dispatch } = React.useContext(MainContext);
  const [updateRecurrentEntry, { loading: mutationLoading }] = useMutation(UPDATE_RECURRENT_ENTRY, {
    onCompleted: () => {
      onClose();
      dispatch(shouldRefresh());
      dispatch(setSuccessSnack("Entry updated!"));
    },
  });

  let dialogTitle = undefined;
  switch (kind) {
    case "recurringPositive":
      dialogTitle = "Update a recurring income";
      break;
    case "recurringNegative":
      dialogTitle = "Update a recurring outcome";
      break;
  }

  const initialValues = { ...updateEntryDialogOpen.entry };
  delete initialValues["__typename"];
  delete initialValues["parentEntry"];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth scroll="body">
      <DialogTitle>{dialogTitle}</DialogTitle>
      <RecurrentEntryForm
        initialValues={initialValues}
        onSubmit={(data, formApi, callback) => updateRecurrentEntry({ variables: { input: data } })}
        onClose={onClose}
        validateButtonLabel="Update"
        loading={mutationLoading}
      />
    </Dialog>
  );
};

export default withStyles(styles)(RecurrentEntryUpdateDialog);
