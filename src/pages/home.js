import React, { useState, useEffect } from "react";

const Home = () => {
  const [hasError, setErrors] = useState(false);
  const [data, setData] = useState({});

  const fetchData = async () => {
    const posts = await fetch("/posts");
    posts
      .json()
      .then((res) => setData(res))
      .catch((err) => setErrors(err));
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="col-span-1 md:col-span-2">
          {!hasError && JSON.stringify(data)}
        </div>

        <div className="col-span-1">.col-span-1</div>
      </div>
    </div>
  );
};

export default Home;
