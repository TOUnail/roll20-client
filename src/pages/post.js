import React, {
  Fragment,
  useContext,
  useEffect,
  useCallback,
  useState,
} from "react";
import Context from "../context/Context";

const Post = (props) => {
  const [mount, setMount] = useState(false);
  const singlePost = useContext(Context);
  const { postId } = props.match.params;
  const fetchPost = useCallback(
    (postId) => {
      singlePost.getPost(postId);
    },
    [singlePost]
  );
  useEffect(() => {
    if (!mount) {
      setMount(true);
      fetchPost(postId);
    }
  }, [mount, fetchPost, postId]);
  return (
    <Context.Consumer>
      {(context) => (
        <Fragment>
          {!context.loadingUI ? (
            <Fragment>
              <button onClick={props.history.goBack}>Go Back</button>
              <p>not loading...</p>
            </Fragment>
          ) : (
            <p>loading</p>
          )}
        </Fragment>
      )}
    </Context.Consumer>
  );
};

export default Post;
