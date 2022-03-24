import { Fragment } from "react";
import "./App.scss";
import { AppRoutes } from "./core/router/appRoutes";
import ErrorBoundary from "./common/components/ErrorBoundry/ErrorBoundary";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <ErrorBoundary>
      {AppRoutes}
      <ToastContainer />
    </ErrorBoundary>
  );
}

export default App;
