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
  Grid,
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
  thinText: {
    fontWeight: 300,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
});

const PrivacyPolicyDialog = ({ classes, open, onClose }) => {
  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth scroll="body">
        <DialogTitle>Privacy Policy</DialogTitle>
        <DialogContent>
          <List>
            <ListItem>
              <Typography variant="h5" className={classes.thinText}>
                We only store information for the purpose of providing our service. Those
                informations include:
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="h6">
                Your login credentials (your password is encrypted, dont't worry!).
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="h6">The outcome and income entries you provide.</Typography>
            </ListItem>
            <ListItem>
              <Typography variant="h6">
                The monthly budget estimates you see at the top of the page.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="h6">
                We also use cookies to keep you logged in via a unique session identifier.
              </Typography>
            </ListItem>
            <MiniSpacer />
            <Divider />
            <MiniSpacer />
            <ListItem>
              <Typography variant="h6">
                Upon account deletion, all the informations related to your account are immediately
                deleted from our database.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="h6">
                Encrypted backups may persits this data for up to 7 days afterwards. Past this
                deadline, everything is gone!
              </Typography>
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

export default withStyles(styles)(PrivacyPolicyDialog);
