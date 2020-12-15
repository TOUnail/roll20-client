import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import Context from "../../context/Context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "pro-regular-svg-icons/faHeart";
import { faHeart as faFilledHeart } from "pro-solid-svg-icons/faHeart";

const LikeComment = (props) => {
  const likeContent = useContext(Context);
  const likedComment = () => {
    if (
      likeContent.likes &&
      likeContent.likes.find((like) => like.commentId === props.commentId)
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
        className="bg-transparent flex text-center justify-center items-center hover:bg-red-100 hover:text-red-800 text-gray-800 font-semibold h-10 w-10 rounded-full"
      >
        <FontAwesomeIcon icon={faHeart} />
      </Link>
    </Fragment>
  ) : likedComment() ? (
    <button
      onClick={(e) => {
        e.stopPropagation();
        likeContent.unlikeComment(props.commentId);
      }}
      className="bg-transparent hover:bg-red-100 hover:text-red-800 focus:outline-none text-gray-800 font-semibold h-10 w-10 rounded-full"
    >
      <FontAwesomeIcon icon={faFilledHeart} />
    </button>
  ) : (
    <button
      onClick={(e) => {
        e.stopPropagation();
        likeContent.likeComment(props.commentId);
      }}
      className="bg-transparent hover:bg-red-100 hover:text-red-800 focus:outline-none text-gray-800 font-semibold h-10 w-10 rounded-full"
    >
      <FontAwesomeIcon icon={faHeart} />
    </button>
  );
  return likeButton;
};

export default LikeComment;
