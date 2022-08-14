import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import Login from "./app/compoments/layouts/login";
import Main from "./app/compoments/layouts/main";
import Users from "./app/compoments/layouts/users";
import User from "./app/compoments/layouts/user";

function App() {
  return (
    <>
      {/* <BrowserRouter> */}
      <ul className="nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">
            Main
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/users">
            Users
          </Link>
        </li>
      </ul>

      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/users/:userId" component={User} />
        <Route path="/users" component={Users} />
      </Switch>
      {/* </BrowserRouter> */}
    </>
  );
}

export default App;
