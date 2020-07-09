import React, { useReducer, useEffect } from "react";
import jwtDecode from "jwt-decode";
import UserReducer from "../reducers/reducer";
import Context from "./Context";

const initialState = {
  authenticated: false,
  credentials: {},
  likes: [],
  notifications: [],
  loadingData: false,
  loadingUI: false,
  errors: {},
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);
  useEffect(() => {
    const token = localStorage.FBIdToken;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        logoutUser();
        window.location.href = "/login";
      } else {
        dispatch({ type: "SET_AUTHENTICATED" });
        new Headers().append("Authorization", token);
        getUserData(token);
      }
    }
  }, []);
  const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem("FBIdToken", FBIdToken);
    new Headers().append("Authorization", FBIdToken);
  };
  const loginUser = async (userData, history) => {
    try {
      dispatch({ type: "LOADING_UI" });
      const response = await fetch("/login", {
        credentials: "include",
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(userData),
      });
      const json = await response.json();
      if (!response.ok) {
        dispatch({ type: "SET_ERRORS", payload: json });
        return Promise.reject(json);
      }
      setAuthorizationHeader(json.token);
      getUserData(`Bearer ${json.token}`);
      dispatch({ type: "CLEAR_ERRORS" });
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  const logoutUser = () => {
    localStorage.removeItem("FBIdToken");
    new Headers().delete("Authorization");
    dispatch({ type: "SET_UNAUTHENTICATED" });
  };
  const signupUser = async (newUserData, history) => {
    try {
      dispatch({ type: "LOADING_UI" });
      const response = await fetch("/signup", {
        credentials: "include",
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(newUserData),
      });
      const json = await response.json();
      if (!response.ok) {
        dispatch({ type: "SET_ERRORS", payload: json });
        return Promise.reject(json);
      }
      dispatch({ type: "SET_AUTHENTICATED" });
      setAuthorizationHeader(json.token);
      getUserData(`Bearer ${json.token}`);
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  const getUserData = async (token) => {
    try {
      dispatch({ type: "LOADING_USER" });
      const response = await fetch("/user", {
        credentials: "include",
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: token,
        },
      });

      response
        .json()
        .then((res) => {
          dispatch({
            type: "SET_USER",
            payload: res,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const value = {
    authenticated: state.authenticated,
    credentials: state.credentials,
    likes: state.likes,
    notifications: state.notifications,
    loadingUI: state.loadingUI,
    loadingData: state.loadingData,
    errors: state.errors,
    loginUser: (userData, props) => {
      loginUser(userData, props);
    },
    signupUser: (newUserData, props) => {
      signupUser(newUserData, props);
    },
    logoutUser: () => {
      logoutUser();
    },
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

//export const Context = createContext(initialState);
export default Store;
