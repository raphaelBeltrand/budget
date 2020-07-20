import * as React from "react";
import {
  withStyles,
  withWidth,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Typography,
} from "@material-ui/core";

const styles = (theme) => ({
  flexGrid: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: theme.spacing(4),
  },
  flexTitle: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  mobileTitle: {},
  dangerButton: {
    color: theme.palette.danger.main,
  },
});

const ConfirmationDialog = ({
  classes,
  confirmAction,
  open,
  onClose,
  confirmLabel,
  cancelLabel,
  caption,
  dialogTitle,
  loading,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1">{caption}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} size="large">
          {cancelLabel}
        </Button>
        {loading ? (
          <CircularProgress />
        ) : (
          <Button onClick={confirmAction} size="large" className={classes.dangerButton}>
            {confirmLabel}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles)(withWidth()(ConfirmationDialog));
