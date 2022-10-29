import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./compoments/ui/navBar";
import { ToastContainer } from "react-toastify";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./layouts/users";
// import { ProfessionProvider } from "./hooks/useProfession";
// import { QualitiesProvider } from "./app/hooks/useQualities";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./compoments/common/protectedRoute";
import LogOut from "./layouts/logOut";
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "./store/qualities";
import { loadProfessionsList } from "./store/professions";
import { loadUsersList } from "./store/users";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadQualitiesList());
    dispatch(loadProfessionsList());
    dispatch(loadUsersList());
  }, []);
  return (
    <>
      <AuthProvider>
        <NavBar />
        {/* <ProfessionProvider> */}
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/login/:type?" component={Login} />
          <Route path="/logout" component={LogOut} />
          <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
          <Route path="/users" component={Users} />
          <Redirect to="/" />
        </Switch>
        {/* </ProfessionProvider> */}
        <ToastContainer />
      </AuthProvider>
    </>
  );
}

export default App;
