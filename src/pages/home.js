import React, { Fragment } from "react";
import Context from "../context/Context";
import Post from "../components/Post";
import Profile from "../components/Profile";

const Home = () => {
  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2">
          <Context.Consumer>
            {(context) => (
              <Fragment>
                {!context.loadingData ? (
                  context.posts.map((post) => (
                    <Post key={post.postId} post={post} />
                  ))
                ) : (
                  <p>Loading...</p>
                )}
              </Fragment>
            )}
          </Context.Consumer>
        </div>
        <div className="col-span-1">
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default Home;
