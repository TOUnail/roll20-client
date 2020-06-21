import React, { useReducer } from "react";
import UserReducer from "../reducers/UserReducer";
import Context from "./Context";

const initialState = {
  authenticated: false,
  credentials: {},
  likes: [],
  notifications: [],
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const loginUser = async (userData, history) => {
    try {
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
        // setErrors(json);
        // setLoading(false);

        throw new Error(JSON.stringify(json));
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
    loginUser: (userData, props) => {
      loginUser(userData, props);
    },
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

//export const Context = createContext(initialState);
export default Store;
