import React, { useState, useEffect } from "react";
import Post from "../components/Post";

const Home = () => {
  const [hasError, setErrors] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const posts = await fetch("/posts");
      posts
        .json()
        .then((res) => setData(res))
        .catch((err) => {
          setErrors(err);
          console.log(hasError);
        });
    };
    fetchData();
  }, [hasError]);

  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="col-span-1 md:col-span-2">
          {data ? (
            data.map((post) => <Post key={post.postId} post={post} />)
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="col-span-1">.col-span-1</div>
      </div>
    </div>
  );
};

export default Home;
