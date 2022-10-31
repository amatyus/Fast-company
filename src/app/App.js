import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./compoments/ui/navBar";
import { ToastContainer } from "react-toastify";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./layouts/users";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./compoments/common/protectedRoute";
import LogOut from "./layouts/logOut";

import AppLoader from "./compoments/ui/hoc/appLoader";

function App() {
  return (
    <>
      <AppLoader>
        <AuthProvider>
          <NavBar />
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/login/:type?" component={Login} />
            <Route path="/logout" component={LogOut} />
            <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
            <Route path="/users" component={Users} />
            <Redirect to="/" />
          </Switch>
        </AuthProvider>
      </AppLoader>

      <ToastContainer />
    </>
  );
}

export default App;
