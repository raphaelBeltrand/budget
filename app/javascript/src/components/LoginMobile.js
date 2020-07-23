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
import { MiniSpacer } from "./Spacers";
import SignUpForm from "./loginForms/SignUpForm";
import SignInForm from "./loginForms/SignInForm";
import { useMutation } from "@apollo/client";
import { SIGN_UP, SIGN_IN } from "../queries/globalQueries";
import TermsDialog from "./TermsDialog";
import PrivacyPolicyDialog from "./PrivacyPolicyDialog";

const styles = (theme) => ({
  background: {
    height: "100%",
    width: "100%",
    background: "linear-gradient(to right bottom, #858DFF, #FFFFFF)",
  },
  centerBand: {
    width: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    borderRadius: 0,
    margin: theme.spacing(1),
  },
  errorLabel: {
    color: theme.palette.danger.main,
  },
  unpaddedLastChild: {
    paddingRight: 0,
  },
  termsGrid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const LoginMobile = ({
  classes,
  error,
  setTermsDialogOpen,
  setPrivacyPolicyDialogOpen,
  signUp,
  signIn,
  signUpLoading,
  signInLoading,
}) => {
  const [signType, setSignType] = React.useState("signup");

  return (
    <>
      <div className={classes.background}>
        <MiniSpacer />
        <Paper elevation={2} className={classes.paper}>
          <Typography variant="h2" color="primary">
            Easy-Peasy Budget
          </Typography>
          <MiniSpacer />
          <Typography variant="h6">
            Hi! Welcome to yet another budget tracking app! This one is fairly simple to use, put in
            some incomes and outcomes and find out how rich you'll be in a few years!
            <br />
            <br />
            First you need to create an account, or sign in if you already have one!
          </Typography>
          <MiniSpacer />
          <div className={classes.termsGrid}>
            <Button
              onClick={() => setTermsDialogOpen(true)}
              size="large"
              variant="outlined"
              color="primary"
            >
              Terms & Conditions
            </Button>
            <MiniSpacer />
            <Button
              onClick={() => setPrivacyPolicyDialogOpen(true)}
              size="large"
              variant="outlined"
              color="primary"
            >
              Privacy Policy
            </Button>
          </div>
        </Paper>
        <Paper elevation={2} className={classes.paper}>
          <Box display="flex" justifyContent="space-around">
            <Button
              size="large"
              variant={signType === "signup" ? "contained" : "outlined"}
              color={signType === "signup" ? "primary" : undefined}
              onClick={() => setSignType("signup")}
            >
              Sign Up
            </Button>
            <Button
              size="large"
              variant={signType === "signin" ? "contained" : "outlined"}
              color={signType === "signin" ? "primary" : undefined}
              onClick={() => setSignType("signin")}
            >
              Sign In
            </Button>
          </Box>
          <MiniSpacer />
          {signType === "signup" ? (
            <SignUpForm
              onSubmit={(data) => signUp({ variables: { input: data } })}
              error={error}
              loading={signUpLoading}
            />
          ) : (
            <SignInForm
              onSubmit={(data) => signIn({ variables: { input: data } })}
              error={error}
              loading={signInLoading}
            />
          )}
        </Paper>
        <MiniSpacer />
      </div>
    </>
  );
};

export default withStyles(styles)(LoginMobile);
