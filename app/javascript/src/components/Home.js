import * as React from "react";
import { Grid, withStyles } from "@material-ui/core";
import { SuperSpacer } from "./Spacers";
import EndOfMonthBudget from "./EndOfMonthBudget";
import EntryBlock from "./EntryBlock";
import { closeNewEntryDialog, closeUpdateEntryDialog } from "../services/mainActions";
import { MainContext } from "../contexts/MainContext";
import { GET_RECURRING_ENTRIES, GET_EXCEPTIONAL_ENTRIES } from "../queries/entryQueries";
import RecurrentEntryNewDialog from "./forms/RecurrentEntryNewDialog";
import ExceptionalEntryNewDialog from "./forms/ExceptionalEntryNewDialog";
import RecurrentEntryUpdateDialog from "./forms/RecurrentEntryUpdateDialog";
import ExceptionalEntryUpdateDialog from "./forms/ExceptionalEntryUpdateDialog";
import Snackbar from "./Snackbar";

const styles = (theme) => ({
  paddedGrid: { paddingLeft: theme.spacing(5), paddingRight: theme.spacing(5) },
});

const Home = ({ classes }) => {
  const { newEntryDialogOpen, updateEntryDialogOpen, snack, dispatch } = React.useContext(
    MainContext
  );

  return (
    <>
      <EndOfMonthBudget />
      <SuperSpacer />
      <Grid container spacing={5} className={classes.paddedGrid}>
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

export default withStyles(styles)(Home);
