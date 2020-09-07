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
        ...state,
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
        (post) => post.postId === action.payload.postData.postId
      );
      console.log(likeIndex);
      state.posts[likeIndex] = action.payload.postData;
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            postId: action.payload.postData.postId,
          },
        ],
      };
    case "UNLIKE_POST":
      let unlikeIndex = state.posts.findIndex(
        (post) => post.postId === action.payload.postInfo.postId
      );
      console.log(unlikeIndex);
      state.posts[unlikeIndex] = action.payload.postInfo;
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.postId !== action.payload.postInfo.postId
        ),
      };
    case "DELETE_POST":
      let deleteIndex = state.posts.findIndex(
        (post) => post.postId === action.payload
      );
      state.posts.splice(deleteIndex, 1);
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default GlobalReducer;
