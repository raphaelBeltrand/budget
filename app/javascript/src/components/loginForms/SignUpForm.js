import * as React from "react";
import {
  Grid,
  withStyles,
  isWidthUp,
  withWidth,
  Paper,
  Typography,
  TextField,
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { Form, Field } from "react-final-form";
import { MiniSpacer } from "../Spacers";

const styles = (theme) => ({
  background: {
    height: "100vh",
    width: "100vw",
    background: "linear-gradient(to right bottom, #858DFF, #FFFFFF)",
  },
  centerBand: {
    paddingTop: "30vh",
  },
  paper: {
    height: "40vh",
    borderRadius: 0,
  },
  errorLabel: {
    color: theme.palette.danger.main,
  },
  flexCentered: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "Mandatory field";
  }
  if (!values.password) {
    errors.password = "Mandatory field";
  }
  if (values.password?.length < 6) {
    errors.password = "Password too short! (min. 6 characters)";
  }
  if (!values.passwordConfirm) {
    errors.passwordConfirm = "Mandatory field";
  }
  if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = "Passwords don't match";
  }
  if (!values.agreement) {
    errors.agreement = "You must agree to the terms!";
  }
  return errors;
};

const SignUpForm = ({ classes, onSubmit, loading, error }) => {
  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Field
              name="username"
              fullWidth
              placeholder="Username"
              variant="outlined"
              render={({ input, meta }) => (
                <TextField
                  {...input}
                  fullWidth
                  label="Username"
                  variant="outlined"
                  InputProps={{
                    endAdornment:
                      meta.touched && meta.error ? (
                        <Box display="flex">
                          <Typography noWrap className={classes.errorLabel}>
                            {meta.error}
                          </Typography>
                        </Box>
                      ) : error === "email_exists" ? (
                        <Box display="flex">
                          <Typography noWrap className={classes.errorLabel}>
                            Username taken
                          </Typography>
                        </Box>
                      ) : undefined,
                  }}
                />
              )}
            />
            <MiniSpacer />
            <Field
              name="password"
              fullWidth
              type="password"
              placeholder="Password"
              variant="outlined"
              render={({ input, meta }) => (
                <TextField
                  {...input}
                  fullWidth
                  label="Password"
                  variant="outlined"
                  InputProps={{
                    endAdornment: meta.touched && meta.error && (
                      <Box display="flex">
                        <Typography noWrap className={classes.errorLabel}>
                          {meta.error}
                        </Typography>
                      </Box>
                    ),
                  }}
                />
              )}
            />
            <MiniSpacer />
            <Field
              name="passwordConfirm"
              fullWidth
              type="password"
              placeholder="Confirm password"
              variant="outlined"
              render={({ input, meta }) => (
                <TextField
                  {...input}
                  fullWidth
                  label="Confirm Password"
                  variant="outlined"
                  InputProps={{
                    endAdornment: meta.touched && meta.error && (
                      <Box display="flex">
                        <Typography noWrap className={classes.errorLabel}>
                          {meta.error}
                        </Typography>
                      </Box>
                    ),
                  }}
                />
              )}
            />
            <MiniSpacer />
            <Field
              name="agreement"
              type="checkbox"
              variant="outlined"
              render={({ input, meta }) => (
                <div
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <FormControlLabel
                    label="I agree to the terms & conditions"
                    control={<Checkbox {...input} color="primary" />}
                  />
                  {meta.touched && meta.error && (
                    <Box display="flex">
                      <Typography noWrap className={classes.errorLabel}>
                        {meta.error}
                      </Typography>
                    </Box>
                  )}
                </div>
              )}
            />
            <MiniSpacer />
            <div className={classes.flexCentered}>
              {loading ? (
                <CircularProgress />
              ) : (
                <Button type="submit" size="large" variant="outlined" color="primary">
                  Sign up!
                </Button>
              )}
            </div>
          </form>
        );
      }}
    />
  );
};
export default withStyles(styles)(SignUpForm);
