import React, { Fragment, useContext } from "react";
import Context from "../context/Context";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/pro-regular-svg-icons/faHeart";
import { faHeart as faFilledHeart } from "@fortawesome/pro-solid-svg-icons/faHeart";
import { faCommentAlt } from "@fortawesome/pro-regular-svg-icons/faCommentAlt";

const Post = (props) => {
  dayjs.extend(relativeTime);
  const postContext = useContext(Context);
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
  const likedPost = () => {
    if (
      postContext.likes &&
      postContext.likes.find((like) => like.postId === postId)
    )
      return true;
    else return false;
  };
  const likeButton = !postContext.authenticated ? (
    <Fragment>
      <Link
        to={"/login"}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2"
      >
        <FontAwesomeIcon icon={faHeart} /> Like
      </Link>
    </Fragment>
  ) : likedPost() ? (
    <button
      onClick={() => postContext.unlikePost(postId)}
      className="bg-white hover:bg-gray-100 focus:outline-none text-gray-800 font-semibold py-1 px-2"
    >
      <FontAwesomeIcon icon={faFilledHeart} /> Unlike
    </button>
  ) : (
    <button
      onClick={() => postContext.likePost(postId)}
      className="bg-white hover:bg-gray-100 focus:outline-none text-gray-800 font-semibold py-1 px-2"
    >
      <FontAwesomeIcon icon={faHeart} /> Like
    </button>
  );
  return (
    <div className="w-full">
      <div className="shadow bg-white px-4 pt-4 my-2 sm:rounded-lg flex flex-col justify-between leading-normal">
        <div className="flex">
          <img
            className="w-10 h-10 rounded-full mr-4"
            src={userImage}
            alt="user"
          />
          <div className="text-sm w-full">
            <p className="text-gray-900 leading-none">
              <Link to={`/users/${userHandle}`}>{userHandle}</Link> rolled a{" "}
              {roll}
            </p>
            <p className="text-gray-600">{dayjs(createdAt).fromNow()}</p>
            <p className={likeCount < 1 || commentCount < 1 ? "mb-3" : ""}>
              {body}
            </p>
            <div className="flex flex-row justify-end">
              {likeCount > 0 && (
                <p
                  className={`text-xs text-gray-600${
                    commentCount > 0 ? " mr-3" : ""
                  }`}
                >
                  {likeCount} Like{likeCount > 1 ? "s" : ""}
                </p>
              )}
              {commentCount > 0 && (
                <p className="text-xs text-gray-600">
                  {commentCount} Comment{commentCount > 1 ? "s" : ""}
                </p>
              )}
            </div>
            <hr />
            <div className="flex justify-around">
              {likeButton}
              <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2">
                <FontAwesomeIcon icon={faCommentAlt} /> Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
