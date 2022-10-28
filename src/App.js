import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./app/compoments/ui/navBar";
import { ToastContainer } from "react-toastify";
import Login from "./app/layouts/login";
import Main from "./app/layouts/main";
import Users from "./app/layouts/users";
import { ProfessionProvider } from "./app/hooks/useProfession";
// import { QualitiesProvider } from "./app/hooks/useQualities";
import AuthProvider from "./app/hooks/useAuth";
import ProtectedRoute from "./app/compoments/common/protectedRoute";
import LogOut from "./app/layouts/logOut";
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "./store/qualities";
import { loadProfessionsList } from "./store/professions";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadQualitiesList());
    dispatch(loadProfessionsList());
  }, []);
  return (
    <>
      <AuthProvider>
        <NavBar />
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
        <ToastContainer />
      </AuthProvider>
    </>
  );
}

export default App;
