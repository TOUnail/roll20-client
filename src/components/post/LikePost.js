import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import Context from "../../context/Context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "pro-regular-svg-icons/faHeart";
import { faHeart as faFilledHeart } from "pro-solid-svg-icons/faHeart";

const LikePost = (props) => {
  const likeContent = useContext(Context);
  const likedPost = () => {
    if (
      likeContent.likes &&
      likeContent.likes.find((like) => like.postId === props.postId)
    )
      return true;
    else return false;
  };
  const likeButton = !likeContent.authenticated ? (
    <Fragment>
      <Link
        to={"/login"}
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-transparent text-center w-full hover:bg-red-100 text-gray-800 font-semibold py-1"
      >
        <FontAwesomeIcon icon={faHeart} /> Like
      </Link>
    </Fragment>
  ) : likedPost() ? (
    <button
      onClick={(e) => {
        e.stopPropagation();
        likeContent.unlikePost(props.postId);
      }}
      className="bg-transparent w-full hover:bg-red-100 focus:outline-none text-gray-800 font-semibold py-1"
    >
      <FontAwesomeIcon icon={faFilledHeart} /> Unlike
    </button>
  ) : (
    <button
      onClick={(e) => {
        e.stopPropagation();
        likeContent.likePost(props.postId);
      }}
      className="bg-transparent w-full hover:bg-red-100 focus:outline-none text-gray-800 font-semibold py-1"
    >
      <FontAwesomeIcon icon={faHeart} /> Like
    </button>
  );
  return likeButton;
};

export default LikePost;
