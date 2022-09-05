import React, { useState } from "react";
import LoginForm from "../compoments/ui/loginForm";
import { useParams } from "react-router-dom";
import RegisterForm from "../compoments/ui/registerForm";

const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(
    type === "register" ? type : "login"
  );

  const toggleFormType = () => {
    setFormType((prevState) =>
      prevState === "register" ? "login" : "register"
    );
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {formType === "register" ? (
            <>
              <h3 className="mb-4">Register</h3>

              <RegisterForm />
              <p>
                Alreadi have account?{" "}
                <a role={"button"} onClick={toggleFormType}>
                  Sign In
                </a>
              </p>
            </>
          ) : (
            <>
              <h3 className="mb-4">Login</h3>

              <LoginForm />
              <p>
                Donte have account?{" "}
                <a role={"button"} onClick={toggleFormType}>
                  Sign App
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
