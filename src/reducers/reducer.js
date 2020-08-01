const GlobalReducer = (state, action) => {
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
        loadingUser: true,
      };
    case "SET_USER":
      return {
        authenticated: true,
        loadingUser: false,
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
    case "LOADING_DATA":
      return {
        ...state,
        loadingData: true,
      };
    case "SET_POSTS":
      return {
        ...state,
        posts: action.payload,
        loadingData: false,
      };
    case "LIKE_POST":
      let likeIndex = state.posts.findIndex(
        (post) => post.postId === action.payload.postId
      );
      state.posts[likeIndex] = action.payload;
      return {
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            postId: action.payload.postId,
          },
        ],
        ...state,
      };
    case "UNLIKE_POST":
      let unlikeIndex = state.posts.findIndex(
        (post) => post.postId === action.payload.postId
      );
      state.posts[unlikeIndex] = action.payload;
      return {
        likes: state.likes.filter(
          (like) => like.postId === action.payload.postId
        ),
        ...state,
      };
    default:
      return state;
  }
};

export default GlobalReducer;
