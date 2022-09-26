import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./app/compoments/ui/navBar";
import { ToastContainer } from "react-toastify";
import Login from "./app/layouts/login";
import Main from "./app/layouts/main";
import Users from "./app/layouts/users";
import { ProfessionProvider } from "./app/hooks/useProfession";
import { QualitiesProvider } from "./app/hooks/useQualities";

function App() {
  return (
    <>
      <NavBar />
      <ProfessionProvider>
        <QualitiesProvider>
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/login/:type?" component={Login} />
            <Route path="/users/:userId?/:edit?" component={Users} />
            <Route path="/users" component={Users} />
            <Redirect to="/" />
          </Switch>
        </QualitiesProvider>
      </ProfessionProvider>
      <ToastContainer />
    </>
  );
}

export default App;
