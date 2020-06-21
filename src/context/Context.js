import { createContext } from "react";

let Context = createContext({
  authenticated: false,
  credentials: {},
  likes: [],
  notifications: [],
});

export default Context;
