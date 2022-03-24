import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavBar from "./../../components/Layout/NavBar/navbar";
import SideBar from "./../../components/Layout/SideBar/sideBar";
import centralStore from "./../../common/store/centralStore";
import { ActionsKey } from "../../common/constants/constants";
import { connect } from "react-redux";
// import Emitter from "./../../core/services/emitter";
// import { useEffect } from "react";
import { ThemeContext, themes } from "../../core/context/theme-context";
import { useState } from "react";
import { ContentRoutes } from "./../../core/router/contentRoutes";
import ErrorBoundary from "../../common/components/ErrorBoundry/ErrorBoundary";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Layout = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = useState({
    theme: themes.dark,
  });

  // Emitter.emit("LOGIN", false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const toggleTheme = () => {
    setState((prevState) => {
      console.log("prevState", prevState);
      const theme =
        prevState.theme === themes.dark ? themes.light : themes.dark;
      return { ...prevState, theme };
    });
  };

  // useEffect(() => {
  // });

  return (
    <ThemeContext.Provider value={{ theme: state.theme, toggleTheme }}>
      <div className={classes.root}>
        <CssBaseline />
        <NavBar drawerOpen={open} handleDrawer={handleDrawerOpen} {...props} />
        <SideBar
          drawerOpen={open}
          handleDrawer={handleDrawerClose}
          {...props}
        />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <h1
            onClick={() => {
              const data = centralStore.dispatch({
                type: ActionsKey.getCurrentUser,
              });
            }}
          >
            {ContentRoutes}
          </h1>
        </main>
      </div>
    </ThemeContext.Provider>
  );
};

const mapStateToProps = (state) => ({
  data: state,
});
export default connect(mapStateToProps)(Layout);
