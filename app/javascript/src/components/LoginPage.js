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
import LoginDesktop from "./LoginDesktop";
import LoginMobile from "./LoginMobile";

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

const LoginPage = ({ width }) => {
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

  const loginPageProps = {
    signUp: signUp,
    signUpLoading: signUpLoading,
    signIn: signIn,
    signInLoading: signInLoading,
    error: error,
    setTermsDialogOpen: setTermsDialogOpen,
    setPrivacyPolicyDialogOpen: setPrivacyPolicyDialogOpen,
  };

  let loginComponent = undefined;
  if (isWidthUp("lg", width)) loginComponent = <LoginDesktop {...loginPageProps} />;
  else loginComponent = <LoginMobile {...loginPageProps} />;

  return (
    <>
      {loginComponent}
      <TermsDialog open={termsDialogOpen} onClose={() => setTermsDialogOpen(false)} />
      <PrivacyPolicyDialog
        open={privacyPolicyDialogOpen}
        onClose={() => setPrivacyPolicyDialogOpen(false)}
      />
    </>
  );
};

export default withStyles(styles)(withWidth()(LoginPage));
