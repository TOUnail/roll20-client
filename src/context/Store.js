import React, { useReducer } from "react";
import jwtDecode from "jwt-decode";
import UserReducer from "../reducers/reducer";
import Context from "./Context";

let loggedIn;
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken * 1000 < Date.now()) {
    loggedIn = false;
  } else {
    loggedIn = true;
  }
} else {
  loggedIn = false;
}
const initialState = {
  authenticated: loggedIn,
  credentials: {},
  likes: [],
  notifications: [],
  loading: false,
  errors: {},
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);
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
      dispatch({ type: "SET_AUTHENTICATED" });
      const FBIdToken = `Bearer ${json.token}`;
      localStorage.setItem("FBIdToken", FBIdToken);
      new Headers().append("Authorization", FBIdToken);
      getUserData(FBIdToken);
      //setLoading(false);
      history.push("/");
    } catch (err) {
      console.log(err);
    }
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
      localStorage.setItem("FBIdToken", `Bearer ${json.token}`);
      dispatch({ type: "SET_AUTHENTICATED" });
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  const getUserData = async (token) => {
    try {
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
          console.log(res);
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
    loading: state.loading,
    errors: state.errors,
    loginUser: (userData, props) => {
      loginUser(userData, props);
    },
    signupUser: (newUserData, props) => {
      signupUser(newUserData, props);
    },
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

//export const Context = createContext(initialState);
export default Store;
