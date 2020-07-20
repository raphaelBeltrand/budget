import * as React from "react";
import {
  withStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  Typography,
  Divider,
  ListItemIcon,
  DialogActions,
  Button,
} from "@material-ui/core";
import { UPDATE_RECURRENT_ENTRY } from "../queries/mutations";
import { MainContext } from "../contexts/MainContext";
import { useMutation } from "@apollo/client";
import { shouldRefresh, setSuccessSnack } from "../services/mainActions";
import { closeMyAccountDialog } from "../services/mainActions";
import useCurrentSession from "./useCurrentSession";
import { MiniSpacer } from "./Spacers";
import { InfoOutlined, SecurityOutlined, DeleteForeverOutlined } from "@material-ui/icons";
import { DELETE_ACCOUNT } from "../queries/globalQueries";
import ConfirmationDialog from "./utils/ConfirmationDialog";

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
  dangerButton: {
    color: theme.palette.danger.main,
  },
});

const TermsDialog = ({ classes, open, onClose }) => {
  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth scroll="body">
        <DialogTitle>Terms & Conditions</DialogTitle>
        <DialogContent>
          <List>
            <ListItem>
              <Typography variant="h5" className={classes.thinText}>
                By using this website you agree to the following:
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="h6">You agree to our privacy policy.</Typography>
            </ListItem>
            <ListItem>
              <Typography variant="h6">
                You will not create a bunch of unnecessary accounts.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="h6">And that's it really, just enjoy using it :)</Typography>
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button size="large" onClick={onClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withStyles(styles)(TermsDialog);
