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
    case "SET_ERRORS":
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        loading: false,
        errors: null,
      };
    case "LOADING_UI":
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default UserReducer;
