import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./app/compoments/ui/navBar";
import { ToastContainer } from "react-toastify";
import Login from "./app/layouts/login";
import Main from "./app/layouts/main";
import Users from "./app/layouts/users";
import { ProfessionProvider } from "./app/hooks/useProfession";
import { QualitiesProvider } from "./app/hooks/useQualities";
import AuthProvider from "./app/hooks/useAuth";
import ProtectedRoute from "./app/compoments/common/protectedRoute";
import LogOut from "./app/layouts/logOut";

function App() {
  return (
    <>
      <AuthProvider>
        <NavBar />
        <QualitiesProvider>
          <ProfessionProvider>
            <Switch>
              <Route path="/" exact component={Main} />
              <Route path="/login/:type?" component={Login} />
              <Route path="/logout" component={LogOut} />
              <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
              <Route path="/users" component={Users} />
              <Redirect to="/" />
            </Switch>
          </ProfessionProvider>
        </QualitiesProvider>
        <ToastContainer />
      </AuthProvider>
    </>
  );
}

export default App;
