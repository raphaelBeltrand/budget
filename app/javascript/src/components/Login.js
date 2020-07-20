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
    height: "100vh",
    width: "100vw",
    background: "linear-gradient(to right bottom, #858DFF, #FFFFFF)",
  },
  centerBand: {
    paddingTop: "29vh",
  },
  centerBandWidth: {
    width: "100%",
  },
  paper: {
    height: "42vh",
    borderRadius: 0,
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

const Login = (props) => {
  const { classes } = props;
  const [signType, setSignType] = React.useState("signup");
  const [error, setError] = React.useState(undefined);
  const [termsDialogOpen, setTermsDialogOpen] = React.useState(false);
  const [privacyPolicyDialogOpen, setPrivacyPolicyDialogOpen] = React.useState(false);
  const [signUp, { loading: signUpLoading }] = useMutation(SIGN_UP, {
    onCompleted: () => location.reload(),
    onError: (e) => setError(e.message),
  });
  const [signIn, { loading: signInLoading }] = useMutation(SIGN_IN, {
    onCompleted: () => location.reload(),
    onError: (e) => setError(e.message),
  });

  return (
    <>
      <div className={classes.background}>
        <Grid container spacing={0} className={classes.centerBand}>
          <Grid item xs={12}>
            <Paper elevation={2} className={classes.paper}>
              <Grid container spacing={5} className={classes.centerBandWidth}>
                <Grid item xs={false} lg={2} />
                <Grid item xs={12} lg={4}>
                  <Typography variant="h2" color="primary">
                    Easy-Peasy Budget
                  </Typography>
                  <MiniSpacer />
                  <Typography variant="h5">
                    Hi! Welcome to yet another budget tracking app! This one is fairly simple to
                    use, put in some incomes and outcomes and find out how rich you'll be in a few
                    years!
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
                </Grid>
                <Grid item xs={false} lg={1} />
                <Grid item xs={12} lg={3}>
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
                </Grid>
                <Grid item xs={false} lg={2} className={classes.unpaddedLastChild} />
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
      <TermsDialog open={termsDialogOpen} onClose={() => setTermsDialogOpen(false)} />
      <PrivacyPolicyDialog
        open={privacyPolicyDialogOpen}
        onClose={() => setPrivacyPolicyDialogOpen(false)}
      />
    </>
  );
};

export default withStyles(styles)(Login);
