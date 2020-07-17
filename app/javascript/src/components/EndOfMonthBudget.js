import * as React from "react";
import { Grid, Typography, withStyles, CircularProgress } from "@material-ui/core";
import { SuperSpacer, MediumSpacer, MiniSpacer } from "./Spacers";
import NumberFormat from "react-number-format";
import { GET_BUDGET_FOR_SELECTED_MONTH } from "../queries/entryQueries";
import useCurrentSession from "./useCurrentSession";
import { useQuery } from "@apollo/client";
import { months } from "./Constants";
import TimeSelector from "./TimeSelector";

const styles = (theme) => ({
  flexGrid: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: theme.spacing(4),
  },
  flexTitle: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  positive: {
    color: theme.palette.positive.main,
    fontWeight: 800,
  },
  negative: {
    color: theme.palette.negative.main,
    fontWeight: 800,
  },
});

const EndOfMonthBudget = ({ classes }) => {
  const currentSession = useCurrentSession();
  // eslint-disable-next-line
  const { data, loading, error, refetch } = useQuery(GET_BUDGET_FOR_SELECTED_MONTH);

  React.useEffect(() => {
    refetch();
  }, [currentSession?.user]);

  return (
    <Grid container className={classes.flexGrid}>
      <Grid item xs={12}>
        <div className={classes.flexTitle}>
          <Typography variant="h4">Money by the end of</Typography>
          <MiniSpacer />
          <TimeSelector />
        </div>
        <SuperSpacer />
        {loading && <CircularProgress />}
        {error || (!data && <Typography>Error</Typography>)}
        {data && !data.budget && <Typography>No data yet</Typography>}
        {data && data.budget && (
          <Typography
            variant="h1"
            className={data.budget.value > 0 ? classes.positive : classes.negative}
          >
            <NumberFormat
              value={data.budget.value}
              displayType={"text"}
              thousandSeparator
              suffix={" €"}
            />
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(EndOfMonthBudget);
