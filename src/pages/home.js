import React, { Fragment, useEffect, useState, useCallback, useContext } from "react";
import Context from "../context/Context";
import AddPost from "../components/post/AddPost";
import Profile from "../components/profile/Profile";
import Post from "../components/post/Post";

const Home = () => {
  const [mount, setMount] = useState(false);
  const homePosts = useContext(Context);
  const fetchPosts = useCallback(
    () => {
      homePosts.getPosts()
    },
    [homePosts],
  )
  useEffect(() => {
    if (!mount) {
      setMount(true);
      fetchPosts();
    }
  }, [mount, fetchPosts]);
  return (
    <Context.Consumer>
      {(context) => (
        <Fragment>
          <div className="col-span-1 md:col-span-2 post-lists relative">
            {context.authenticated && <AddPost />}
            {!context.loadingData ? (
              context.posts.map((post) => <Post key={post.postId} post={post} />)
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <div className="col-span-1">
            <Profile />
          </div>
        </Fragment>
      )}
    </Context.Consumer>
  );
};

export default Home;
