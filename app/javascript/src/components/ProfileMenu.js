import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItem,
  Popover,
  Typography,
  withStyles,
  CircularProgress,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import useCurrentSession from "./useCurrentSession";
import { AccountBox as UserIcon } from "@material-ui/icons";
import { SIGN_OUT } from "../queries/globalQueries";
import { useMutation } from "@apollo/client";
import MyAccountDialog from "./MyAccountDialog";
import { openMyAccountDialog } from "../services/mainActions";
import { MainContext } from "../contexts/MainContext";

const styles = (theme) => ({
  buttonProfile: {
    width: "40px",
    height: "40px",
    boxShadow: "none",
    padding: 0,
    backgroundColor: theme.palette.grey["900"],
    color: theme.palette.primary.contrastText,
  },
  typoName: {
    marginLeft: theme.spacing(2.4),
  },
  darkBackground: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
  thickerText: {
    fontWeight: 500,
  },
  menuButton: {
    color: "white",
    width: "40px",
    height: "40px",
  },
  menuIcon: {
    color: "white",
    width: "30px",
    height: "30px",
  },
});

const ProfileMenu = ({ classes }) => {
  const { user } = useCurrentSession() || {};
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { dispatch } = React.useContext(MainContext);
  const [signOut, { loading: signOutLoading }] = useMutation(SIGN_OUT, {
    onCompleted: () => location.reload(),
  });

  if (!user) {
    return null;
  }

  return (
    <>
      <IconButton
        className={classes.menuButton}
        onClick={(e) => {
          setAnchorEl(e.target);
          setOpen(true);
        }}
      >
        <UserIcon className={classes.menuIcon} />
      </IconButton>
      <Popover
        open={open}
        onClose={() => setOpen(false)}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 45, horizontal: "left" }}
      >
        <ListItem>
          <Typography variant="h6" className={classes.typoName} display="inline">
            Logged in as&nbsp;&nbsp;
          </Typography>
          <Typography display="inline" variant="h5">
            {user.username}
          </Typography>
        </ListItem>
        <Divider />
        <ListItem>
          <Box display="flex" flexGrow="1" justifyContent="space-between">
            <Button
              variant="contained"
              className={classes.darkBackground}
              onClick={() => {
                setOpen(false);
                dispatch(openMyAccountDialog());
              }}
            >
              <Typography variant="body1">My account</Typography>
            </Button>
            {signOutLoading ? (
              <CircularProgress />
            ) : (
              <Button
                style={{ marginLeft: 10 }}
                onClick={() => signOut({ variables: { input: {} } })}
              >
                <Typography variant="body1" className={classes.thickerText}>
                  Logout
                </Typography>
              </Button>
            )}
          </Box>
        </ListItem>
      </Popover>
      <MyAccountDialog />
    </>
  );
};

export default withStyles(styles)(ProfileMenu);
