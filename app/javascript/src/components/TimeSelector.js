import * as React from "react";
import {
  Grid,
  Typography,
  withStyles,
  CircularProgress,
  MenuItem,
  Select,
} from "@material-ui/core";
import { SuperSpacer, MiniSpacer } from "./Spacers";
import NumberFormat from "react-number-format";
import useCurrentSession from "./useCurrentSession";
import { useQuery, useMutation } from "@apollo/client";
import { months, years } from "./Constants";
import { UPDATE_SELECTED_MONTH, UPDATE_SELECTED_YEAR } from "../queries/mutations";
import { GET_SESSION } from "../queries/globalQueries";

const styles = (theme) => ({
  flexTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  selectFont: {
    fontSize: "2rem",
  },
});

const TimeSelector = ({ classes }) => {
  const currentSession = useCurrentSession();
  const [currentMonth, setCurrentMonth] = React.useState(
    currentSession?.user.selectedMonth || new Date().getMonth() + 1
  );
  const [currentYear, setCurrentYear] = React.useState(
    currentSession?.user.selectedYear || new Date().getFullYear()
  );
  const [updateSelectedMonth] = useMutation(UPDATE_SELECTED_MONTH, {
    update(cache, { data: { updateSelectedMonth } }) {
      const { session } = cache.readQuery({ query: GET_SESSION });
      cache.writeQuery({
        query: GET_SESSION,
        data: {
          session: {
            ...session,
            user: { ...session.user, selectedMonth: updateSelectedMonth.month },
          },
        },
      });
    },
  });
  const [updateSelectedYear] = useMutation(UPDATE_SELECTED_YEAR, {
    update(cache, { data: { updateSelectedYear } }) {
      const { session } = cache.readQuery({ query: GET_SESSION });
      cache.writeQuery({
        query: GET_SESSION,
        data: {
          session: {
            ...session,
            user: { ...session.user, selectedYear: updateSelectedYear.year },
          },
        },
      });
    },
  });

  React.useEffect(() => {
    if (currentSession) {
      setCurrentMonth(currentSession?.user.selectedMonth);
      setCurrentYear(currentSession?.user.selectedYear);
    }
  }, [currentSession]);

  if (!currentSession) return <CircularProgress />;
  return (
    <div className={classes.flexTitle}>
      <Select
        value={currentMonth}
        onChange={(e) => {
          setCurrentMonth(e.target.value);
          updateSelectedMonth({ variables: { input: { month: e.target.value } } });
        }}
        className={classes.selectFont}
      >
        {months.map((month) => (
          <MenuItem value={month.value} key={month.value}>
            {month.label}
          </MenuItem>
        ))}
      </Select>
      <MiniSpacer />
      <Select
        value={currentYear}
        onChange={(e) => {
          setCurrentYear(e.target.value);
          updateSelectedYear({ variables: { input: { year: e.target.value } } });
        }}
        className={classes.selectFont}
      >
        {years.map((year) => (
          <MenuItem value={year} key={year}>
            {year}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default withStyles(styles)(TimeSelector);
