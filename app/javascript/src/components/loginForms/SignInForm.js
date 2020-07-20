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
  return errors;
};

const SignInForm = ({ classes, onSubmit, error }) => {
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
                <>
                  <TextField
                    {...input}
                    fullWidth
                    color="secondary"
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
                        ) : error === "unknown_username" ? (
                          <Box display="flex">
                            <Typography noWrap className={classes.errorLabel}>
                              Username not found
                            </Typography>
                          </Box>
                        ) : undefined,
                    }}
                  />
                </>
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
                    endAdornment:
                      meta.touched && meta.error ? (
                        <Box display="flex">
                          <Typography noWrap className={classes.errorLabel}>
                            {meta.error}
                          </Typography>
                        </Box>
                      ) : error === "wrong_pwd" ? (
                        <Box display="flex">
                          <Typography noWrap className={classes.errorLabel}>
                            Wrong password
                          </Typography>
                        </Box>
                      ) : undefined,
                  }}
                />
              )}
            />
            <MiniSpacer />
            <div className={classes.flexCentered}>
              <Button type="submit" size="large" variant="outlined" color="primary">
                Sign in!
              </Button>
            </div>
          </form>
        );
      }}
    />
  );
};
export default withStyles(styles)(SignInForm);
