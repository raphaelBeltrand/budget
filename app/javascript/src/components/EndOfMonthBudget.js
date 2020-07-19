import * as React from "react";
import {
  Grid,
  Typography,
  withStyles,
  CircularProgress,
  isWidthUp,
  withWidth,
  Button,
} from "@material-ui/core";
import { SuperSpacer, MediumSpacer, MiniSpacer } from "./Spacers";
import NumberFormat from "react-number-format";
import { GET_BUDGET_FOR_SELECTED_MONTH } from "../queries/entryQueries";
import { SET_NEXT_MONTH, SET_PREVIOUS_MONTH } from "../queries/mutations";
import useCurrentSession from "./useCurrentSession";
import { useQuery, useMutation } from "@apollo/client";
import { months } from "./Constants";
import TimeSelector from "./TimeSelector";
import { MainContext } from "../contexts/MainContext";
import { shouldRefreshOff } from "../services/mainActions";

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
  mobileTitle: {},
  positive: {
    color: theme.palette.primary.main,
    fontWeight: 800,
  },
  negative: {
    color: theme.palette.secondary.main,
    fontWeight: 800,
  },
});

const EndOfMonthBudget = ({ classes, width }) => {
  const { shouldRefresh, dispatch } = React.useContext(MainContext);
  const { data, loading, error, refetch } = useQuery(GET_BUDGET_FOR_SELECTED_MONTH);
  // const [setPreviousMonth] = useMutation(SET_PREVIOUS_MONTH);
  // const [setNextMonth] = useMutation(SET_NEXT_MONTH);

  React.useEffect(() => {
    if (shouldRefresh) {
      refetch();
      dispatch(shouldRefreshOff());
    }
  }, [shouldRefresh]);

  return (
    <Grid container className={classes.flexGrid}>
      <Grid item xs={12}>
        <div className={isWidthUp("lg", width) ? classes.flexTitle : classes.mobileTitle}>
          <Typography variant="h4">Money by the end of</Typography>
          <MiniSpacer />
          <TimeSelector />
        </div>
        {/* <Button onClick={() => setPreviousMonth()}>Previous month</Button> */}
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

export default withStyles(styles)(withWidth()(EndOfMonthBudget));
