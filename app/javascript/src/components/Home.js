import * as React from "react";
import { Grid, withStyles, isWidthUp, withWidth } from "@material-ui/core";
import { SuperSpacer } from "./Spacers";
import EndOfMonthBudget from "./EndOfMonthBudget";
import EntryBlock from "./EntryBlock";
import {
  closeNewEntryDialog,
  closeUpdateEntryDialog,
  unsetEntryToDelete,
  shouldRefresh,
  setSuccessSnack,
} from "../services/mainActions";
import { MainContext } from "../contexts/MainContext";
import { GET_RECURRING_ENTRIES, GET_EXCEPTIONAL_ENTRIES } from "../queries/entryQueries";
import { DELETE_RECURRENT_ENTRY, DELETE_EXCEPTIONAL_ENTRY } from "../queries/mutations";
import RecurrentEntryNewDialog from "./forms/RecurrentEntryNewDialog";
import ExceptionalEntryNewDialog from "./forms/ExceptionalEntryNewDialog";
import RecurrentEntryUpdateDialog from "./forms/RecurrentEntryUpdateDialog";
import ExceptionalEntryUpdateDialog from "./forms/ExceptionalEntryUpdateDialog";
import Snackbar from "./Snackbar";
import ConfirmationDialog from "./utils/ConfirmationDialog";
import { useMutation } from "@apollo/client";

const styles = (theme) => ({
  paddedGrid: { paddingLeft: theme.spacing(5), width: "100%" },
  paddedGridMobile: { paddingLeft: theme.spacing(5), width: "100%" },
});

const Home = ({ classes, width }) => {
  const {
    newEntryDialogOpen,
    entryToDelete,
    updateEntryDialogOpen,
    snack,
    dispatch,
  } = React.useContext(MainContext);

  let mutation = undefined;
  if (entryToDelete?.kind) {
    mutation = entryToDelete.kind.match(/^exceptional/)
      ? DELETE_EXCEPTIONAL_ENTRY
      : DELETE_RECURRENT_ENTRY;
  }
  const [deleteEntry, { loading: mutationLoading }] = mutation
    ? useMutation(mutation, {
        onCompleted: () => {
          dispatch(unsetEntryToDelete());
          dispatch(shouldRefresh());
          dispatch(setSuccessSnack("Entry deleted!"));
        },
      })
    : [undefined, {}];

  return (
    <>
      <EndOfMonthBudget />
      <SuperSpacer />
      <Grid
        container
        spacing={5}
        className={isWidthUp("lg", width) ? classes.paddedGrid : classes.paddedGridMobile}
      >
        <EntryBlock
          kind="recurringPositive"
          query={GET_RECURRING_ENTRIES}
          variables={{
            kind: "positive",
          }}
        />
        <EntryBlock
          kind="recurringNegative"
          query={GET_RECURRING_ENTRIES}
          variables={{
            kind: "negative",
          }}
        />
        <EntryBlock
          kind="exceptionalPositive"
          query={GET_EXCEPTIONAL_ENTRIES}
          variables={{
            kind: "positive",
          }}
        />
        <EntryBlock
          kind="exceptionalNegative"
          query={GET_EXCEPTIONAL_ENTRIES}
          variables={{
            kind: "negative",
          }}
        />
      </Grid>
      {entryToDelete && entryToDelete.entry && (
        <ConfirmationDialog
          open={!!entryToDelete}
          confirmAction={() =>
            deleteEntry({ variables: { input: { id: entryToDelete.entry.id } } })
          }
          onClose={() => dispatch(unsetEntryToDelete())}
          cancelLabel="Cancel"
          confirmLabel="Delete"
          caption="Are you sure you want to delete this entry?"
          dialogTitle="Confirm entry deletion"
          loading={mutationLoading}
        />
      )}
      {newEntryDialogOpen?.match(/^exceptional/) ? (
        <ExceptionalEntryNewDialog
          open={!!newEntryDialogOpen}
          onClose={() => dispatch(closeNewEntryDialog())}
          kind={newEntryDialogOpen}
        />
      ) : (
        <RecurrentEntryNewDialog
          open={!!newEntryDialogOpen}
          onClose={() => dispatch(closeNewEntryDialog())}
          kind={newEntryDialogOpen}
        />
      )}
      {updateEntryDialogOpen?.kind?.match(/^exceptional/) ? (
        <ExceptionalEntryUpdateDialog
          open={updateEntryDialogOpen.entry !== null}
          onClose={() => dispatch(closeUpdateEntryDialog())}
          kind={updateEntryDialogOpen.kind}
        />
      ) : (
        <RecurrentEntryUpdateDialog
          open={updateEntryDialogOpen.entry !== null}
          onClose={() => dispatch(closeUpdateEntryDialog())}
          kind={updateEntryDialogOpen.kind}
        />
      )}
      {snack && snack.message !== null && <Snackbar />}
    </>
  );
};

export default withStyles(styles)(withWidth()(Home));
