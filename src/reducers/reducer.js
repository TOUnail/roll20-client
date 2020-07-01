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
    case "LOADING_USER":
      return {
        ...state,
        loadingData: true,
      };
    case "SET_USER":
      return {
        authenticated: true,
        loadingData: false,
        ...action.payload,
      };
    case "SET_ERRORS":
      return {
        ...state,
        loadingUI: false,
        errors: action.payload,
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        loadingUI: false,
        errors: null,
      };
    case "LOADING_UI":
      return {
        ...state,
        loadingUI: true,
      };
    default:
      return state;
  }
};

export default UserReducer;
