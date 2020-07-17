import * as React from "react";
import { withStyles, Snackbar as SnackbarUI, SnackbarContent, IconButton } from "@material-ui/core";
import { MainContext } from "../contexts/MainContext";
import { unsetSnack } from "../services/mainActions";
import Close from "@material-ui/icons/Close";
import { classNames } from "classnames";

const styles = (theme) => ({
  success: {
    backgroundColor: theme.palette.primary.main,
  },
  error: {
    backgroundColor: theme.palette.danger.main,
  },
  info: {
    backgroundColor: theme.palette.secondary.main,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: "flex",
    alignItems: "center",
    maxWidth: 480,
  },
});

const Snackbar = ({ classes }) => {
  const { snack, dispatch } = React.useContext(MainContext);

  return (
    <SnackbarUI
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={snack.message !== null}
      autoHideDuration={3000}
      onClose={() => dispatch(unsetSnack())}
      ContentProps={{ classes: { root: classes[snack.status] } }}
      message={
        <span id="client-snack" className={classes.message}>
          {snack.message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          color="inherit"
          className={classes.close}
          onClick={() => dispatch(unsetSnack())}
        >
          <Close className={classes.icon} />
        </IconButton>,
      ]}
    />
  );
};

export default withStyles(styles)(Snackbar);
