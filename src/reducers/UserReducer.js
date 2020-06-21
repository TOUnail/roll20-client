const UserReducer = (state, action) => {
  switch (action.type) {
    case "SET_AUTHENTICATED":
      return {
        ...state,
        authenticated: true,
      };
    case "SET_UNAUTHENTICATED":
      return {
        ...state,
      };
    case "SET_USER":
      return {
        authenticated: true,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default UserReducer;
