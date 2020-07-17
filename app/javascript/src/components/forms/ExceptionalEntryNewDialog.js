import * as React from "react";
import { withStyles, Dialog, DialogTitle } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { NEW_EXCEPTIONAL_ENTRY } from "../../queries/mutations";
import ExceptionalEntryForm from "./ExceptionalEntryForm";
import { MainContext } from "../../contexts/MainContext";
import { shouldRefreshOff, shouldRefresh, setSuccessSnack } from "../../services/mainActions";

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
  const { dispatch } = React.useContext(MainContext);
  const [newExceptionalEntry, { loading: mutationLoading }] = useMutation(NEW_EXCEPTIONAL_ENTRY, {
    onCompleted: () => {
      onClose();
      dispatch(shouldRefresh());
      dispatch(setSuccessSnack("Entry added!"));
    },
  });

  let dialogTitle = undefined;
  let formKind = undefined;
  switch (kind) {
    case "exceptionalPositive":
      dialogTitle = "Add a one-timey income";
      formKind = "positive";
      break;
    case "exceptionalNegative":
      dialogTitle = "Add a one-timey outcome";
      formKind = "negative";
      break;
  }

  const initialValues = {
    label: "",
    value: null,
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    kind: formKind,
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth scroll="body">
      <DialogTitle>{dialogTitle}</DialogTitle>
      <ExceptionalEntryForm
        initialValues={initialValues}
        onSubmit={(data) => newExceptionalEntry({ variables: { input: data } })}
        onClose={onClose}
        validateButtonLabel="Add"
        loading={mutationLoading}
      />
    </Dialog>
  );
};

export default withStyles(styles)(ExceptionalEntryNewDialog);
