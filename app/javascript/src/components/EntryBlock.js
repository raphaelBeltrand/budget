import * as React from "react";
import {
  Grid,
  Paper,
  Typography,
  withStyles,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import { Add as AddIcon, Create as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";
import { MiniSpacer } from "./Spacers";
import NumberFormat from "react-number-format";
import AddEntryDialog from "./forms/ExceptionalEntryForm";
import { MainContext } from "../contexts/MainContext";
import {
  setNewEntryDialogOpen,
  setUpdateEntryDialogOpen,
  shouldRefreshOff,
  setEntryToDelete,
} from "../services/mainActions";
import { useQuery } from "@apollo/client";
import useCurrentSession from "./useCurrentSession";

const styles = (theme) => ({
  flexGrid: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "center",
  },
  paper: {
    padding: theme.spacing(2),
  },
  flexRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flexRight: {
    display: "flex",
    alignItems: "center",
  },
  flexItem: {
    padding: theme.spacing(1),
  },
  flexItemDanger: {
    padding: theme.spacing(1),
    color: theme.palette.danger.main,
  },
  separator: {
    width: "30%",
  },
});

const setDialogTitle = (kind) => {
  switch (kind) {
    case "recurringPositive":
      return "Recurring Income";
    case "recurringNegative":
      return "Recurring Outcome";
    case "exceptionalPositive":
      return "One-timey Income";
    case "exceptionalNegative":
      return "One-timey Outcome";
    default:
      return "";
  }
};

const EntryBlock = ({ classes, kind, query, variables }) => {
  const { shouldRefresh, dispatch } = React.useContext(MainContext);
  const { data, loading, error, refetch } = useQuery(query, { variables });
  const currentSession = useCurrentSession();

  React.useEffect(() => {
    if (shouldRefresh) {
      refetch();
      dispatch(shouldRefreshOff());
    }
  }, [shouldRefresh]);

  const dialogTitle = setDialogTitle(kind);

  if (loading) return <CircularProgress />;
  if (error) return <Typography>Error</Typography>;
  if (!data || !data.entries) return <Typography>Error</Typography>;

  const entries = data.entries;

  return (
    <>
      <Grid item xs={12} lg={3}>
        <Paper elevation={2} className={classes.paper}>
          <div className={classes.flexGrid}>
            <Typography variant="h5">{dialogTitle}</Typography>
            <IconButton onClick={() => dispatch(setNewEntryDialogOpen(kind))}>
              <AddIcon />
            </IconButton>
          </div>
          <MiniSpacer />
          <hr className={classes.separator} />
          {entries && entries.length > 0 ? (
            entries.map((entry) => (
              <div key={entry.id} className={classes.flexRow}>
                <Typography variant="h6">
                  {kind.match(/^exceptional/) ? entry.label : entry.label}
                  {/* TODO PARENT ENTRY */}
                </Typography>
                <div className={classes.flexRight}>
                  <Typography variant="h6" className={classes.flexItem}>
                    <NumberFormat
                      value={entry.value}
                      displayType={"text"}
                      thousandSeparator
                      suffix={" €"}
                    />
                  </Typography>
                  <IconButton
                    onClick={() => dispatch(setUpdateEntryDialogOpen(entry, kind))}
                    className={classes.flexItem}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => dispatch(setEntryToDelete(entry, kind))}
                    className={classes.flexItemDanger}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            ))
          ) : (
            <Typography>None</Typography>
          )}
        </Paper>
      </Grid>
    </>
  );
};

export default withStyles(styles)(EntryBlock);
