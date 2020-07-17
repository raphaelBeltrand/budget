import * as React from "react";
import {
  Grid,
  withStyles,
  DialogContent,
  FormControl,
  InputLabel,
  TextField,
  DialogActions,
  Button,
  Select,
  MenuItem,
} from "@material-ui/core";
import { MiniSpacer, MediumSpacer } from "../Spacers";
import NumberFormat from "react-number-format";
import { months, years, periodicities } from "../Constants";

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
});

const NumberFormatCustom = (props) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
};

const AddEntryDialog = ({ classes, open, onClose, kind }) => {
  const [value, setValue] = React.useState();
  const [label, setLabel] = React.useState("");
  const [periodicity, setPeriodicity] = React.useState();
  const [startMonth, setStartMonth] = React.useState(new Date().getMonth());
  const [startYear, setStartYear] = React.useState(new Date().getFullYear());

  let dialogTitle = undefined;
  switch (kind) {
    case "recurringPositive":
      dialogTitle = "Add a recurring income";
      break;
    case "recurringNegative":
      dialogTitle = "Add a recurring outcome";
      break;
    case "exceptionalPositive":
      dialogTitle = "Add a one-timey income";
      break;
    case "exceptionalNegative":
      dialogTitle = "Add a one-timey outcome";
      break;
  }

  return (
    <>
      <DialogContent>
        <TextField
          fullWidth
          placeholder="Label"
          variant="outlined"
          onChange={(e) => setLabel(e.target.value)}
          value={label}
        />
        <MiniSpacer />
        <TextField
          fullWidth
          value={value}
          placeholder="Value"
          onChange={(e) => setValue(e.target.value)}
          name="numberformat"
          variant="outlined"
          id="formatted-numberformat-input"
          InputProps={{
            inputComponent: NumberFormatCustom,
            endAdornment: " €",
          }}
        />
        <MiniSpacer />
        <Grid spacing={1} container>
          <Grid item xs={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="monthLabel">Start month</InputLabel>
              <Select
                labelId="monthLabel"
                value={startMonth}
                onChange={(e) => setStartMonth(e.target.value)}
                label="Start Month"
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left",
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "left",
                  },
                  getContentAnchorEl: null,
                }}
              >
                {months.map((month) => (
                  <MenuItem key={month.value} value={month.value}>
                    {month.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="yearLabel">Start Year</InputLabel>
              <Select
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left",
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "left",
                  },
                  getContentAnchorEl: null,
                }}
                labelId="yearLabel"
                value={startYear}
                onChange={(e) => setStartYear(e.target.value)}
                label="Start Year"
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <MiniSpacer />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="periodicity">Periodicity</InputLabel>
          <Select
            labelId="periodicity"
            value={periodicity}
            onChange={(e) => setPeriodicity(e.target.value)}
            label="periodicity"
            MenuProps={{
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left",
              },
              getContentAnchorEl: null,
            }}
          >
            {periodicities.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <MediumSpacer />
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </>
  );
};

export default withStyles(styles)(AddEntryDialog);
