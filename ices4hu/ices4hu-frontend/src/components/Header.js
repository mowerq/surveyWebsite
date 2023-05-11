import { AppBar, Box, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import logo from "../logo.png";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    alignItems: "center",
    background: "linear-gradient(58deg, rgba(85, 37, 134, 1) 20%, rgba(181, 137, 214, 1) 100%)",
  },
  logo: {
    height: "40px",
    marginRight: "10px",
  },
  box: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
  },
  menuIcon: {
    marginRight: "10px",
  },
}));

export default function Header() {
  const classes = useStyles();

  const displayDesktop = () => {
    return (
      <Toolbar className={classes.root}>
        <MenuIcon className={classes.menuIcon} />
        <Box className={classes.box}>
          <img src={logo} alt="logo" className={classes.logo} />
          <Typography variant="h6">ICES4HU</Typography>
        </Box>
      </Toolbar>
    );
  };

  return (
    <header>
      <AppBar>{displayDesktop()}</AppBar>
    </header>
  );
}
