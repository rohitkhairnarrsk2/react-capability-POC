import { Switch } from "react-router";
import { Route } from "react-router";
import { Redirect } from "react-router";
import NotFound from "./../../common/components/NotFound/not-found";
import ProtectedRoute from "./../../common/components/ProtectedRoute/protectedRoute";
import ProductList from "./../../components/productList/productList";
import ProductDetails from "./../../UI/ProductDetails/ProductDetails";
import { Fragment } from "react";
import Login from "./../../containers/authentication/login/login";

export const ContentRoutes = (
  <Switch>
    <ProtectedRoute exact path="/portal/productList" component={ProductList} />
    <ProtectedRoute
      exact
      path="/portal/productList/:id"
      component={ProductDetails}
    />
    <ProtectedRoute
      exact
      path="/portal/abc"
      render={() => {
        return <h1>Rohit</h1>;
      }}
    />
  </Switch>
);
