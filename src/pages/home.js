import React, { Fragment } from "react";
import Context from "../context/Context";
import AddPost from "../components/post/AddPost";
import Post from "../components/post/Post";

const Home = () => {
  return (
    <Context.Consumer>
      {(context) => (
        <Fragment>
          {context.authenticated && <AddPost />}
          {!context.loadingData ? (
            context.posts.map((post) => <Post key={post.postId} post={post} />)
          ) : (
            <p>Loading...</p>
          )}
        </Fragment>
      )}
    </Context.Consumer>
  );
};

export default Home;
