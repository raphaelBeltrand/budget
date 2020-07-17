import { Dialog, DialogTitle, withStyles } from "@material-ui/core";
import * as React from "react";
import { UPDATE_EXCEPTIONAL_ENTRY } from "../../queries/mutations";
import ExceptionalEntryForm from "./ExceptionalEntryForm";
import { setSuccessSnack } from "../../services/mainActions";

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

const UpdateExceptionalEntryDialog = ({ open, onClose, kind }) => {
  const { updateEntryDialogOpen } = React.useContext(MainContext);
  const [updateExceptionalEntry] = useMutation(UPDATE_EXCEPTIONAL_ENTRY, {
    onCompleted: () => {
      onClose();
      dispatchEvent(setSuccessSnack("Entry updated!"));
    },
  });

  let dialogTitle = undefined;
  switch (kind) {
    case "exceptionalPositive":
      dialogTitle = "Update a one-timey income";
      break;
    case "exceptionalNegative":
      dialogTitle = "Update a one-timey outcome";
      break;
  }

  const initialValues = { ...updateEntryDialogOpen.entry };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth scroll="body">
      <DialogTitle>{dialogTitle}</DialogTitle>
      <ExceptionalEntryForm
        initialValues={initialValues}
        onSubmit={(data, formApi, callback) =>
          updateExceptionalEntry({ variables: { input: data } })
        }
        onClose={onClose}
        validateButonLabel="Add"
      />
    </Dialog>
  );
};

export default withStyles(styles)(UpdateExceptionalEntryDialog);
