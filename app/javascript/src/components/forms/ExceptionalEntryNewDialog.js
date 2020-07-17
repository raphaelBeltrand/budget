import * as React from "react";
import { withStyles, Dialog, DialogTitle } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { NEW_EXCEPTIONAL_ENTRY } from "../../queries/mutations";
import ExceptionalEntryForm from "./ExceptionalEntryForm";

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

const ExceptionalEntryNewDialog = ({ open, onClose, kind }) => {
  const [newExceptionalEntry] = useMutation(NEW_EXCEPTIONAL_ENTRY, {
    onCompleted: () => {
      onClose();
      dispatchEvent(setSuccessSnack("Entry added!"));
    },
  });

  let dialogTitle = undefined;
  switch (kind) {
    case "exceptionalPositive":
      dialogTitle = "Add a one-timey income";
      break;
    case "exceptionalNegative":
      dialogTitle = "Add a one-timey outcome";
      break;
  }

  const initialValues = {
    label: "",
    value: null,
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth scroll="body">
      <DialogTitle>{dialogTitle}</DialogTitle>
      <ExceptionalEntryForm
        initialValues={initialValues}
        onSubmit={(data) => newExceptionalEntry({ variables: { input: data } })}
        onClose={onClose}
        validateButtonLabel="Add"
      />
    </Dialog>
  );
};

export default withStyles(styles)(ExceptionalEntryNewDialog);
