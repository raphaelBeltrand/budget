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
import { months, years, periodicities } from "../Constants";
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
  if (!values.startMonth) {
    errors.startMonth = "Mandatory field";
  }
  if (!values.startYear) {
    errors.startYear = "Mandatory field";
  }
  if (!values.endMonth) {
    errors.endMonth = "Mandatory field";
  }
  if (!values.endYear) {
    errors.endYear = "Mandatory field";
  }
  if (!values.periodicity) {
    errors.periodicity = "Mandatory field";
  }
  if (values.startMonth && values.startYear && values.endMonth && values.endYear) {
    if (values.startYear === values.endYear && values.startMonth > values.endMonth)
      errors.endMonth = "Start time must be anterior to end time!";
    else if (values.startYear > values.endYear)
      errors.endMonth = "Start time must be anterior to end time!";
  }

  return errors;
};

const parse = (value) => (isNaN(parseFloat(value)) ? "" : parseFloat(value));

const RecurrentEntryForm = ({
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
              placeholder="Label"
              variant="outlined"
              render={({ input, meta }) => (
                <>
                  <TextField {...input} fullWidth placeholder="Label" variant="outlined" />
                  {meta.touched && meta.error && (
                    <Box pt={1}>
                      <Typography className={classes.errorLabel}>{meta.error}</Typography>
                    </Box>
                  )}
                </>
              )}
            />
            <MiniSpacer />
            <hr />
            <MiniSpacer />
            <Grid spacing={1} container>
              <Grid item xs={6}>
                <Field
                  name="value"
                  parse={parse}
                  render={({ input, meta }) => (
                    <>
                      <TextField
                        {...input}
                        fullWidth
                        placeholder="Value"
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
              </Grid>
              <Grid item xs={6}>
                <Field
                  name="periodicity"
                  render={({ input, meta }) => (
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="periodicityLabel">Periodicity</InputLabel>
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
                        labelId="periodicityLabel"
                        label="Periodicity"
                      >
                        {periodicities.map((periodicity) => (
                          <MenuItem key={periodicity.value} value={periodicity.value}>
                            {periodicity.label}
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
            <MiniSpacer />
            <Grid spacing={1} container>
              <Grid item xs={6}>
                <Field
                  name="startMonth"
                  render={({ input, meta }) => (
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="startMonthLabel">Start Month</InputLabel>
                      <Select
                        {...input}
                        labelId="startMonthLabel"
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
                  name="startYear"
                  render={({ input, meta }) => (
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="startYearLabel">Start Year</InputLabel>
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
                        labelId="startYearLabel"
                        label="Start Year"
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
            <MiniSpacer />
            <Grid spacing={1} container>
              <Grid item xs={6}>
                <Field
                  name="endMonth"
                  render={({ input, meta }) => (
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="endMonthLabel">End Month</InputLabel>
                      <Select
                        {...input}
                        labelId="endMonthLabel"
                        label="End Month"
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
                  name="endYear"
                  render={({ input, meta }) => (
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="endYearLabel">End Year</InputLabel>
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
                        labelId="endYearLabel"
                        label="End Year"
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

export default withStyles(styles)(RecurrentEntryForm);
