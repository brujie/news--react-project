import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "../views/login/index.jsx";
import BaseLayout from "../views/baseLayout/index.jsx";

export default function IndexRouter() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login} />
        {/* <Route path="/detail/:id" component={Detail} /> */}
        <Route
          path="/"
          render={() => {
          return localStorage.getItem("token") ? <BaseLayout /> : <Redirect to="login" />;
          }}
        />
      </Switch>
    </HashRouter>
  );
}
