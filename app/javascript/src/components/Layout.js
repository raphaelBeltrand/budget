import * as React from "react";
import {
  Drawer,
  AppBar,
  Button,
  withStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  IconButton,
  CircularProgress,
  Toolbar,
  Popper,
} from "@material-ui/core";
import { MainContext } from "../contexts/MainContext";
import { openDrawer, closeDrawer, setDrawerYear } from "../services/mainActions";
import { MediumSpacer, MiniSpacer } from "./Spacers";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import {
  ChevronLeftOutlined,
  ChevronRightOutlined,
  Menu as BurgerMenuIcon,
  AccountBox as UserIcon,
} from "@material-ui/icons";
import { useQuery } from "@apollo/client";
import { GET_YEAR_ENTRIES } from "../queries/entryQueries";
import useCurrentSession from "./useCurrentSession";
import { months } from "./Constants";
import ProfileMenu from "./ProfileMenu";

const styles = (theme) => ({
  list: {
    width: 300,
  },
  drawerYear: {
    display: "flex",
    alignItems: "center",
    flexGrow: "1",
    justifyContent: "space-between",
    height: 80,
    background: "linear-gradient(to right bottom, #858DFF, #FFFFFF)",
    padding: theme.spacing(2),
  },
  year: {
    color: theme.palette.primary.dark,
  },
  placeholderText: {
    textAlign: "center",
    paddingTop: theme.spacing(4),
  },
  entry: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: theme.spacing(3),
  },
  appBarRoot: {
    height: 50,
    flexGrow: 1,
  },
  toolFlex: {
    height: 50,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
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

const Layout = ({ classes }) => {
  const { drawerOpen, yearForDrawer, dispatch } = React.useContext(MainContext);
  const { data, loading, error } = useQuery(GET_YEAR_ENTRIES, {
    variables: { year: yearForDrawer || new Date().getFullYear() },
  });

  return (
    <>
      <AppBar className={classes.appBarRoot} position="static">
        <Toolbar className={classes.toolFlex} variant="dense">
          <ProfileMenu />
          <Typography variant="h5" className={classes.title}>
            My Little Budget
          </Typography>
          <IconButton className={classes.menuButton} onClick={() => dispatch(openDrawer())}>
            <BurgerMenuIcon className={classes.menuIcon} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={() => dispatch(closeDrawer())}>
        <div className={classes.list}>
          <div className={classes.drawerYear}>
            <IconButton onClick={() => dispatch(setDrawerYear(yearForDrawer - 1))}>
              <ChevronLeftOutlined />
            </IconButton>
            <Typography variant="h3" className={classes.year}>
              {yearForDrawer}
            </Typography>
            <IconButton onClick={() => dispatch(setDrawerYear(yearForDrawer + 1))}>
              <ChevronRightOutlined />
            </IconButton>
          </div>
          {(loading || !data) && <CircularProgress className={classes.placeholderText} />}
          {error && (
            <Typography variant="h6" className={classes.placeholderText}>
              ERROR
            </Typography>
          )}
          {data && data.yearEntries.length === 0 && (
            <Typography variant="h6" className={classes.placeholderText}>
              No data yet
            </Typography>
          )}
          {data && data.yearEntries.length > 0 && (
            <List className={classes.entryList}>
              {data.yearEntries.map((budget) => (
                <ListItem button key={budget.id} className={classes.entry}>
                  <Typography variant="h4">
                    {months.filter((a) => a.value === budget.month)[0].label}
                  </Typography>
                  <Typography variant="h5">{`${budget.value} €`}</Typography>
                </ListItem>
              ))}
            </List>
          )}
        </div>
      </Drawer>
      <MiniSpacer />
    </>
  );
};

export default withStyles(styles)(Layout);
