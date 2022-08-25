import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./app/compoments/navBar";
import Login from "./app/layouts/login";
import Main from "./app/layouts/main";
import Users from "./app/layouts/users";
import User from "./app/compoments/user";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/users/:userId" component={User} />
        <Route path="/users" component={Users} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;
