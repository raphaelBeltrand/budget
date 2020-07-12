import * as React from "react";
import { Grid, withStyles } from "@material-ui/core";
import { SuperSpacer } from "./Spacers";
import EndOfMonthBudget from "./EndOfMonthBudget";
import EntryBlock from "./EntryBlock";
import AddEntryDialog from "./AddEntryDialog";
import { setEntryDialogOpen } from "../services/mainActions";
import { MainContext } from "../contexts/MainContext";
import { GET_RECURRING_ENTRIES, GET_EXCEPTIONAL_ENTRIES } from "../queries/entryQueries";

const styles = (theme) => ({
  paddedGrid: { paddingLeft: theme.spacing(5), paddingRight: theme.spacing(5) },
});

const Home = ({ classes }) => {
  const { entryDialogOpen, dispatch } = React.useContext(MainContext);

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
      <AddEntryDialog
        open={!!entryDialogOpen}
        onClose={() => dispatch(setEntryDialogOpen(null))}
        kind={entryDialogOpen}
      />
    </>
  );
};

export default withStyles(styles)(Home);
