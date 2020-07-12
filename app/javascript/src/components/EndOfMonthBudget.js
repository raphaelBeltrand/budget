import * as React from "react";
import { Grid, Typography, withStyles } from "@material-ui/core";
import { SuperSpacer } from "./Spacers";
import NumberFormat from "react-number-format";

const styles = (theme) => ({
  flexGrid: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: theme.spacing(4),
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

const Home = ({ classes }) => {
  const [currentMonth, setCurrentMonth] = React.useState("July");
  const [currentYear, setCurrentYear] = React.useState(2020);
  const [endOfMonthBudget, setEndOfMonthBudget] = React.useState(127.54);

  return (
    <Grid container className={classes.flexGrid}>
      <Grid item xs={12}>
        <Typography variant="h4">
          Money by the end of {currentMonth} {currentYear}
        </Typography>
        <SuperSpacer />
        <Typography
          variant="h1"
          className={endOfMonthBudget > 0 ? classes.positive : classes.negative}
        >
          <NumberFormat
            value={endOfMonthBudget}
            displayType={"text"}
            thousandSeparator
            suffix={" €"}
          />
        </Typography>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Home);
