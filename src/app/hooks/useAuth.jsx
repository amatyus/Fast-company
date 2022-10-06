import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import { setTokens } from "../services/localStorage.service";

const httpAuth = axios.create();
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setUser] = useState({});
  const [error, setError] = useState(null);

  async function signUp({ email, password, ...rest }) {
    try {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;

      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
      await createUser({ _id: data.localId, email, ...rest });
      console.log({ data });
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      const errorObject = {
        email: "Пользователь с таким Email уже существует"
      };
      console.log(code, message);
      if (code === 400) {
        if (message === "EMAIL_EXISTS") {
          throw errorObject;
        }
      }
    }
  }

  async function logIn({ email, password, ...rest }) {
    try {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true
      });
      console.log(data);
      setTokens(data);
      await createUser({ _id: data.localId, email, ...rest });
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      //   const errorObjectEmail = {
      //     email: "Неверный Email",
      //     password: "Неверный Password"
      //   };
      console.log(code, message);
      if (code === 400) {
        if (message === "EMAIL_NOT_FOUND") {
          const errorObjectEmail = {
            email: "Неверный Email"
          };

          throw errorObjectEmail;
        }
        if (message === "INVALID_PASSWORD") {
          const errorObjectPaaword = {
            password: "Неверный Password"
          };

          throw errorObjectPaaword;
        }
      }
    }
  }

  async function createUser(data) {
    try {
      const { conrent } = userService.create(data);
      setUser(conrent);
    } catch (error) {
      errorCatcher(error);
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  return (
    <AuthContext.Provider value={{ signUp, createUser, logIn }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default AuthProvider;
