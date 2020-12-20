import React, {
  Fragment,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import Context from "../context/Context";
import Post from "../components/post/Post";

const User = (props) => {
  const [mount, setMount] = useState(false);
  const userPosts = useContext(Context);
  const handle = props.match.params.handle;
  const fetchUser = useCallback(
    (handle) => {
      //console.log(handle)
      userPosts.getUserPageData(handle);
    },
    [userPosts]
  );
  useEffect(() => {
    if (!mount) {
      setMount(true);
      fetchUser(handle);
    }
  }, [mount, fetchUser, handle]);
  return (
    <Context.Consumer>
      {(context) => (
        <Fragment>
            <div className="col-span-1 md:col-span-2 post-lists relative">
          {!context.loadingUI ? (
            context.posts.map((post) => <Post key={post.postId} post={post} />)
          ) : (
            <div>loading</div>
          )}
          </div>
          <div className="col-span-1">
            Fake Profile
          </div>
        </Fragment>
      )}
    </Context.Consumer>
  );
};

export default User;
