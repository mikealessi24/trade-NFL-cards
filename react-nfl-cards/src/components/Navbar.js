import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { navigate } from "@reach/router";
import HomeDrawer from "./HomeDrawer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar({ setSignedIn }) {
  const classes = useStyles();

  function logout() {
    setSignedIn(undefined);
    navigate("/");
  }

  return (
    <div className={classes.root}>
      <AppBar style={style.nav} position="static">
        <Toolbar>
          <HomeDrawer />
          <Typography variant="h6" className={classes.title}></Typography>
          <Button onClick={() => logout()} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const style = {
  nav: {
    backgroundColor: "blue",
  },
};
