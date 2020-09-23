import React, { useReducer, useEffect } from "react";
import jwtDecode from "jwt-decode";
import GlobalReducer from "../reducers/reducer";
import Context from "./Context";

const initialState = {
  authenticated: false,
  posts: [],
  post: {},
  credentials: {},
  likes: [],
  notifications: [],
  loadingUser: false,
  loadingUI: false,
  loadingData: false,
  errors: {},
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, initialState);
  useEffect(() => {
    const token = localStorage.FBIdToken;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        logoutUser();
      } else {
        dispatch({ type: "SET_AUTHENTICATED" });
        new Headers().append("Authorization", token);
        getUserData(token);
      }
    }
    const getPosts = async () => {
      try {
        dispatch({ type: "LOADING_DATA" });
        const response = await fetch("/posts");
        response
          .json()
          .then((res) => {
            dispatch({
              type: "SET_POSTS",
              payload: res,
            });
          })
          .catch((err) => {
            dispatch({
              type: "SET_POSTS",
              payload: [],
            });
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
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
    window.location.href = "/login";
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
  const getPost = async (postId) => {
    try {
      dispatch({ type: "LOADING_UI" });
      const response = await fetch(`/post/${postId}`);
      response.json().then((res) => {
        dispatch({
          type: "SET_POST",
          payload: res,
        });
        dispatch({
          type: "END_LOADING_UI",
        });
      });
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
  const addPost = async (newPost) => {
    try {
      dispatch({ type: "LOADING_UI" });
      const token = localStorage.FBIdToken;
      const response = await fetch("/post", {
        credentials: "include",
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: token,
        },
        body: JSON.stringify(newPost),
      });
      response.json().then((res) => {
        dispatch({
          type: "ADD_POST",
          payload: res,
        });
        dispatch({
          type: "CLEAR_ERRORS",
        });
      });
    } catch (err) {
      dispatch({
        type: "SET_ERRORS",
        payload: err.response,
      });
    }
  };
  const editUserDetails = async (userDetails) => {
    try {
      dispatch({ type: "LOADING_USER" });
      const token = localStorage.FBIdToken;
      await fetch("/user", {
        credentials: "include",
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: token,
        },
        body: JSON.stringify(userDetails),
      }).then(() => {
        getUserData(token);
      });
    } catch (err) {
      console.log(err);
    }
  };
  const uploadImage = async (formData) => {
    try {
      dispatch({ type: "LOADING_USER" });
      const token = localStorage.FBIdToken;
      await fetch("/user/image", {
        credentials: "include",
        method: "post",
        headers: {
          Authorization: token,
        },
        body: formData,
      }).then(() => {
        getUserData(token);
      });
    } catch (err) {
      console.log(err);
    }
  };
  const likePost = async (postId) => {
    try {
      const token = localStorage.FBIdToken;

      const response = await fetch(`/post/${postId}/like`, {
        credentials: "include",
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: token,
        },
      });
      response.json().then((res) => {
        dispatch({ type: "LIKE_POST", payload: res });
      });
    } catch (err) {
      console.log(err);
    }
  };
  const unlikePost = async (postId) => {
    try {
      const token = localStorage.FBIdToken;
      const response = await fetch(`/post/${postId}/unlike`, {
        credentials: "include",
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: token,
        },
      });
      response.json().then((res) => {
        dispatch({ type: "UNLIKE_POST", payload: res });
      });
    } catch (err) {
      console.log(err);
    }
  };
  const deletePost = async (postId) => {
    try {
      const token = localStorage.FBIdToken;
      const response = await fetch(`/post/${postId}`, {
        credentials: "include",
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: token,
        },
      });
      response.json().then((res) => {
        dispatch({ type: "DELETE_POST", payload: postId });
      });
    } catch (err) {
      console.log(err);
    }
  };
  // const getPosts = useCallback(async () => {
  //   // try {
  //   dispatch({ type: "LOADING_DATA" });
  //   console.log("try fetch");
  //   dispatch({ type: "SET_POSTS", payload: ["test"] });
  //   // const response = await fetch("/posts");
  //   // response
  //   //   .json()
  //   //   .then((res) => {
  //   //     dispatch({
  //   //       type: "SET_POSTS",
  //   //       payload: res,
  //   //     });
  //   //   })
  //   //   .catch((err) => {
  //   //     dispatch({
  //   //       type: "SET_POSTS",
  //   //       payload: [],
  //   //     });
  //   //     console.log(err);
  //   //   });
  //   // } catch (err) {
  //   //   console.log(err);
  //   // }
  // }, []);
  const value = {
    authenticated: state.authenticated,
    credentials: state.credentials,
    posts: state.posts,
    post: state.post,
    likes: state.likes,
    notifications: state.notifications,
    loadingUI: state.loadingUI,
    loadingUser: state.loadingUser,
    loadingData: state.loadingData,
    errors: state.errors,
    // getPosts: () => {
    //   getPosts();
    // },
    addPost: (newPost) => {
      addPost(newPost);
    },
    likePost: (postId) => {
      likePost(postId);
    },
    unlikePost: (postId) => {
      unlikePost(postId);
    },
    deletePost: (postId) => {
      deletePost(postId);
    },
    loginUser: (userData, props) => {
      loginUser(userData, props);
    },
    getPost: (postId) => {
      getPost(postId);
    },
    signupUser: (newUserData, props) => {
      signupUser(newUserData, props);
    },
    uploadImage: (formData) => {
      uploadImage(formData);
    },
    logoutUser: () => {
      logoutUser();
    },
    editUserDetails: (userDetails) => {
      editUserDetails(userDetails);
    },
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

//export const Context = createContext(initialState);
export default Store;
