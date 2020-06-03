import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const Post = (props) => {
  dayjs.extend(relativeTime);
  const {
    post: {
      body,
      createdAt,
      userImage,
      userHandle,
      postId,
      likeCount,
      commentCount,
      roll,
    },
  } = props;
  return (
    <div className="w-full">
      <div className="shadow bg-white p-4 my-2 sm:rounded-lg flex flex-col justify-between leading-normal">
        <div className="flex">
          <img
            className="w-10 h-10 rounded-full mr-4"
            src={userImage}
            alt="user"
          />
          <div className="text-sm">
            <p className="text-gray-900 leading-none">
              <Link to={`/users/${userHandle}`}>{userHandle}</Link> rolled a{" "}
              {roll}
            </p>
            <p className="text-gray-600">{dayjs(createdAt).fromNow()}</p>
            <p>{body}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
