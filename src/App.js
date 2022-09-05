import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./app/compoments/ui/navBar";
import Login from "./app/layouts/login";
import Main from "./app/layouts/main";
import Users from "./app/layouts/users";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login/:type?" component={Login} />
        <Route path="/users/:userId?/:edit?" component={Users} />
        <Route path="/users" component={Users} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;
