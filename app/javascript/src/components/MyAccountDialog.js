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
import TermsDialog from "./TermsDialog";
import PrivacyPolicyDialog from "./PrivacyPolicyDialog";

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

const MyAccountDialog = ({ classes, open, onClose, kind }) => {
  const { myAccountDialogOpen, dispatch } = React.useContext(MainContext);
  const [confirmDialog, setConfirmDialog] = React.useState(false);
  const [termsDialogOpen, setTermsDialogOpen] = React.useState(false);
  const [privacyPolicyDialogOpen, setPrivacyPolicyDialogOpen] = React.useState(false);
  const currentSession = useCurrentSession();
  const [deleteAccount, { loading: mutationLoading }] = useMutation(DELETE_ACCOUNT, {
    onCompleted: () => {
      location.reload();
    },
  });

  return (
    <>
      <Dialog
        open={myAccountDialogOpen}
        onClose={() => dispatch(closeMyAccountDialog())}
        maxWidth="sm"
        fullWidth
        scroll="body"
      >
        <DialogTitle>My Account</DialogTitle>
        <DialogContent>
          <List>
            <ListItem>
              <Typography variant="h6" display="inline">
                Username:&nbsp;
              </Typography>
              <Typography variant="h5" display="inline">
                {currentSession?.user?.username}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="h6" display="inline">
                Account created:&nbsp;
              </Typography>
              <Typography variant="h5" display="inline">
                {new Date(currentSession?.user?.createdAt * 1000).toLocaleDateString()}
              </Typography>
            </ListItem>
            <MiniSpacer />
            <Divider />
            <MiniSpacer />
            <ListItem button onClick={() => setTermsDialogOpen(true)}>
              <ListItemIcon>
                <InfoOutlined />
              </ListItemIcon>
              <Typography variant="h6" display="inline">
                Terms & Conditions&nbsp;
              </Typography>
            </ListItem>
            <ListItem button onClick={() => setPrivacyPolicyDialogOpen(true)}>
              <ListItemIcon>
                <SecurityOutlined />
              </ListItemIcon>
              <Typography variant="h6" display="inline">
                Privacy Policy&nbsp;
              </Typography>
            </ListItem>
            <MiniSpacer />
            <Divider />
            <MiniSpacer />
            <ListItem
              button
              onClick={() => setConfirmDialog(true)}
              className={classes.dangerButton}
            >
              <ListItemIcon>
                <DeleteForeverOutlined className={classes.dangerButton} />
              </ListItemIcon>
              <Typography variant="h6" display="inline">
                Delete my account&nbsp;
              </Typography>
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button size="large" onClick={() => dispatch(closeMyAccountDialog())}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmationDialog
        open={confirmDialog}
        onClose={() => setConfirmDialog(false)}
        cancelLabel="Cancel"
        confirmLabel="I'm sure"
        dialogTitle="Confirm account deletion"
        caption="Are you sure you want to delete your account? All data will be destroyed and you won't be able to recover it."
        confirmAction={() => deleteAccount({ variables: { input: {} } })}
        loading={mutationLoading}
      />
      <TermsDialog open={termsDialogOpen} onClose={() => setTermsDialogOpen(false)} />
      <PrivacyPolicyDialog
        open={privacyPolicyDialogOpen}
        onClose={() => setPrivacyPolicyDialogOpen(false)}
      />
    </>
  );
};

export default withStyles(styles)(MyAccountDialog);
