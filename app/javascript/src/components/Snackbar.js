import * as React from "react";
import { withStyles, Snackbar as SnackbarUI, SnackbarContent } from "@material-ui/core";
import { MainContext } from "../contexts/MainContext";
import { unsetSnack } from "../services/mainActions";
import Close from "@material-ui/icons/Close";

const styles = (theme) =>
  getStyles({
    success: {
      backgroundColor: green[600],
    },
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    info: {
      backgroundColor: theme.palette.primary.dark,
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
  const { snackbar, dispatch } = React.useContext(MainContext);

  return (
    <SnackbarUI
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      onClose={() => dispatch(unsetSnack())}
    >
      <SnackbarContent
        className={classNames(classes[snackbar.status], className)}
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={classNames(classes.icon, classes.iconVariant)} />
            {snackbar.message}
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
    </SnackbarUI>
  );
};

export default withStyles(styles)(Snackbar);
