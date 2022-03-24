import React, { useRef } from "react";
import "./navbar.scss";
import { Toolbar } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import { drawerWidth } from "../../../common/constants/constants";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import * as authService from "./../../../core/services/authService";
import { useContext } from "react";
import { ThemeContext } from "../../../core/context/theme-context";
// import { useHistory } from "react-router";
import Switch from "@material-ui/core/Switch";
// import { useEffect } from "react";
// import { useCallback } from "react";
// import { useState } from "react";
// import { useImperativeHandle } from "react";
import { useDebugValue } from "react";
const useStyles = makeStyles((theme) => ({
  appBar: (props) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: props.background,
    color: props.foreground,
  }),
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    // marginRight: 70,
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
}));

const NavBar = (props) => {
  const themeContext = useContext(ThemeContext);
  let classes = useStyles(themeContext.theme);
  let menuRef = useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = () => {
    setAnchorEl(menuRef.current);
  };
  // const navigate = useHistory();

  useDebugValue("Offline");
  const handleClose = (action) => {
    setAnchorEl(null);
    switch (action) {
      case "LogOut":
        authService.logOut().then(() => {
          props.history.push("/");
          // navigate.push("/");
        });
        break;
      case "Profile":
        break;
      default:
    }
  };
  const [state, setState] = React.useState({
    checked: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    themeContext.toggleTheme();
  };
  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: props.drawerOpen,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={props.handleDrawer}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: props.drawerOpen,
          })}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          Mini variant drawer
        </Typography>

        <div className="navMenu">
          <Switch
            checked={state.checked}
            onChange={handleChange}
            color="primary"
            name="checked"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
          <IconButton
            ref={menuRef}
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose.bind(this, "Profile")}>
              Profile
            </MenuItem>
            <MenuItem onClick={handleClose.bind(this, "LogOut")}>
              LogOut
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
