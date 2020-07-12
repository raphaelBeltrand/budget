import * as React from "react";
import {
  Grid,
  Paper,
  Typography,
  withStyles,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import { MiniSpacer } from "./Spacers";
import NumberFormat from "react-number-format";
import AddEntryDialog from "./AddEntryDialog";
import { MainContext } from "../contexts/MainContext";
import { setEntryDialogOpen } from "../services/mainActions";
import { useQuery } from "react-apollo";

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
  const { dispatch } = React.useContext(MainContext);
  const { data, loading, error } = useQuery(query, { variables });

  const dialogTitle = setDialogTitle(kind);
  console.log(data, loading, error);

  if (loading) return <CircularProgress />;
  if (error) return <Typography>Error</Typography>;
  if (!data || !data.entries) return <Typography>Error</Typography>;

  const entries = data.entries;

  return (
    <>
      <Grid item xs={3}>
        <Paper elevation={2} className={classes.paper}>
          <div className={classes.flexGrid}>
            <Typography variant="h5">{dialogTitle}</Typography>
            <IconButton onClick={() => dispatch(setEntryDialogOpen(kind))}>
              <AddIcon />
            </IconButton>
          </div>
          <MiniSpacer />
          <hr className={classes.separator} />
          {entries && entries.length > 0 ? (
            entries.map((action) => (
              <div key={action.label} className={classes.flexRow}>
                <Typography variant="h6">{action.label}</Typography>
                <Typography variant="h6">
                  <NumberFormat
                    value={action.value}
                    displayType={"text"}
                    thousandSeparator
                    suffix={" €"}
                  />
                </Typography>
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
