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
  Box,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { MiniSpacer, MediumSpacer } from "../Spacers";
import NumberFormat from "react-number-format";
import { months, years } from "../Constants";
import { Form, Field } from "react-final-form";

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
  errorLabel: {
    color: theme.palette.danger.main,
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

const validate = (values) => {
  const errors = {};
  if (!values.label) {
    errors.label = "Mandatory field";
  }
  if (!values.value) {
    errors.value = "Mandatory field";
  }
  if (!values.month) {
    errors.month = "Mandatory field";
  }
  if (!values.year) {
    errors.year = "Mandatory field";
  }
  return errors;
};

const parse = (value) => (isNaN(parseFloat(value)) ? "" : parseFloat(value));

const ExceptionalEntryForm = ({
  classes,
  initialValues,
  onClose,
  onSubmit,
  validateButtonLabel,
  loading,
}) => {
  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Field
              name="label"
              fullWidth
              variant="outlined"
              render={({ input, meta }) => (
                <>
                  <TextField {...input} fullWidth label="Label" variant="outlined" />
                  {meta.touched && meta.error && (
                    <Box pt={1}>
                      <Typography className={classes.errorLabel}>{meta.error}</Typography>
                    </Box>
                  )}
                </>
              )}
            />
            <MiniSpacer />
            <Field
              name="value"
              parse={parse}
              render={({ input, meta }) => (
                <>
                  <TextField
                    {...input}
                    fullWidth
                    label="Value"
                    variant="outlined"
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                      endAdornment: " €",
                    }}
                  />
                  {meta.touched && meta.error && (
                    <Box pt={1}>
                      <Typography className={classes.errorLabel}>{meta.error}</Typography>
                    </Box>
                  )}
                </>
              )}
            />
            <MiniSpacer />
            <Grid spacing={1} container>
              <Grid item xs={6}>
                <Field
                  name="month"
                  render={({ input, meta }) => (
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="monthLabel">Month</InputLabel>
                      <Select
                        {...input}
                        labelId="monthLabel"
                        label="Month"
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
                      {meta.touched && meta.error && (
                        <Box pt={1}>
                          <Typography className={classes.errorLabel}>{meta.error}</Typography>
                        </Box>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  name="year"
                  render={({ input, meta }) => (
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="yearLabel">Year</InputLabel>
                      <Select
                        {...input}
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
                        label="Year"
                      >
                        {years.map((year) => (
                          <MenuItem key={year} value={year}>
                            {year}
                          </MenuItem>
                        ))}
                      </Select>
                      {meta.touched && meta.error && (
                        <Box pt={1}>
                          <Typography className={classes.errorLabel}>{meta.error}</Typography>
                        </Box>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <MediumSpacer />
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            {loading ? (
              <CircularProgress />
            ) : (
              <Button color="primary" variant="contained" type="submit">
                {validateButtonLabel}
              </Button>
            )}
          </DialogActions>
        </form>
      )}
    />
  );
};

export default withStyles(styles)(ExceptionalEntryForm);
