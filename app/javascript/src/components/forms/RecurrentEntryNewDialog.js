import * as React from "react";
import { withStyles, Dialog, DialogTitle } from "@material-ui/core";
import NumberFormat from "react-number-format";
import { useMutation } from "@apollo/client";
import { NEW_EXCEPTIONAL_ENTRY, NEW_RECURRENT_ENTRY } from "../../queries/mutations";
import ExceptionalEntryForm from "./ExceptionalEntryForm";
import { MainContext } from "../../contexts/MainContext";
import { shouldRefreshOff, shouldRefresh, setSuccessSnack } from "../../services/mainActions";
import RecurrentEntryForm from "./RecurrentEntryForm";
import useCurrentSession from "../useCurrentSession";

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

const RecurrentEntryNewDialog = ({ classes, open, onClose, kind }) => {
  const { dispatch } = React.useContext(MainContext);
  const currentSession = useCurrentSession();
  const [newRecurrentEntry, { loading: mutationLoading }] = useMutation(NEW_RECURRENT_ENTRY, {
    onCompleted: () => {
      onClose();
      dispatch(shouldRefresh());
      dispatch(setSuccessSnack("Entry added!"));
    },
  });

  let dialogTitle = undefined;
  let formKind = undefined;
  switch (kind) {
    case "recurringPositive":
      dialogTitle = "Add a recurring income";
      formKind = "positive";
      break;
    case "recurringNegative":
      dialogTitle = "Add a recurring outcome";
      formKind = "negative";
      break;
  }

  const initialValues = {
    label: "",
    value: null,
    startMonth: currentSession?.user?.selectedMonth || new Date().getMonth() + 1,
    startYear: currentSession?.user?.selectedYear || new Date().getFullYear() + 1,
    endMonth: 12,
    endYear: 2030,
    periodicity: 1,
    kind: formKind,
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth scroll="body">
      <DialogTitle>{dialogTitle}</DialogTitle>
      <RecurrentEntryForm
        initialValues={initialValues}
        onSubmit={(data) => newRecurrentEntry({ variables: { input: data } })}
        onClose={onClose}
        validateButtonLabel="Add"
        loading={mutationLoading}
      />
    </Dialog>
  );
};

export default withStyles(styles)(RecurrentEntryNewDialog);
