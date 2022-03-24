import React, { Suspense } from "react";
import { Switch } from "react-router";
import { Route } from "react-router";
import { Redirect } from "react-router";
const Login = React.lazy(() =>
  import("../../containers/authentication/login/login")
);
const ProtectedRoute = React.lazy(() =>
  import("./../../common/components/ProtectedRoute/protectedRoute")
);
const Register = React.lazy(() =>
  import("../../components/RegisterUser/registerUser")
);
const NotFound = React.lazy(() =>
  import("./../../common/components/NotFound/not-found")
);
const Layout = React.lazy(() => import("./../../containers/Layout/layout"));

export const AppRoutes = (
  <Suspense fallback={<h1>Loading...</h1>}>
    <Switch>
      <Route exact path="/" component={Login}></Route>
      <Route path="/register" component={Register}></Route>
      <ProtectedRoute path="/portal" component={Layout} />
      <Route path="/not-found" component={NotFound}></Route>
      <Redirect to="/not-found"></Redirect>
    </Switch>
  </Suspense>
);
