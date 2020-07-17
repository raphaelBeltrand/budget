import * as React from "react";
import { withStyles, Dialog, DialogTitle } from "@material-ui/core";
import NumberFormat from "react-number-format";
import RecurrentEntryForm from "./RecurrentEntryForm";

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

const NumberFormatCustom = (props) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
};

const RecurrentEntryUpdateDialog = ({ classes, open, onClose, kind }) => {
  let dialogTitle = undefined;
  switch (kind) {
    case "recurringPositive":
      dialogTitle = "Update a recurring income";
      break;
    case "recurringNegative":
      dialogTitle = "Update a recurring outcome";
      break;
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth scroll="body">
      <DialogTitle>{dialogTitle}</DialogTitle>
      <RecurrentEntryForm />
    </Dialog>
  );
};

export default withStyles(styles)(RecurrentEntryUpdateDialog);
