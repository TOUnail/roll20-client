import React, { Fragment, useContext } from "react";
// import PostDialog from "./PostDialog";
import DeletePost from "./DeletePost";
// import Modal from "./Modal";
// import useModal from "../util/useModal";
import Context from "../context/Context";
import { Link, useHistory } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/pro-regular-svg-icons/faHeart";
import { faHeart as faFilledHeart } from "@fortawesome/pro-solid-svg-icons/faHeart";
import { faCommentAlt } from "@fortawesome/pro-regular-svg-icons/faCommentAlt";

const Post = (props) => {
  dayjs.extend(relativeTime);
  const postContext = useContext(Context);
  let history = useHistory();
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
  // const { open, toggleModal } = useModal();
  const handleOpen = (postId) => {
    // toggleModal();
    // postContext.getPost(postId);
    history.push(`/post/${postId}`);
  };
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
        postContext.unlikePost(postId);
      }}
      className="bg-transparent w-full hover:bg-red-100 focus:outline-none text-gray-800 font-semibold py-1"
    >
      <FontAwesomeIcon icon={faFilledHeart} /> Unlike
    </button>
  ) : (
    <button
      onClick={(e) => {
        e.stopPropagation();
        postContext.likePost(postId);
      }}
      className="bg-transparent w-full hover:bg-red-100 focus:outline-none text-gray-800 font-semibold py-1"
    >
      <FontAwesomeIcon icon={faHeart} /> Like
    </button>
  );
  const deleteButton =
    postContext.authenticated &&
    postContext.credentials.handle === props.post.userHandle ? (
      <DeletePost postId={postId} />
    ) : null;
  return (
    <Fragment>
      <div
        className="shadow cursor-pointer bg-white hover:bg-gray-100 px-4 pt-4 my-2 sm:rounded-lg flex flex-col justify-between leading-normal"
        onClick={() => {
          handleOpen(postId);
        }}
      >
        <div className="flex">
          <Link
            onClick={(e) => e.stopPropagation()}
            to={`/users/${userHandle}`}
            className="h-10 mr-4"
          >
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={userImage}
              alt="user"
            />
          </Link>
          <div className="text-sm flex-1">
            <div className="flex items-center justify-between">
              <p className="text-gray-900 font-bold leading-none">
                <Link
                  onClick={(e) => e.stopPropagation()}
                  className="hover:underline"
                  to={`/users/${userHandle}`}
                >
                  {userHandle}
                </Link>{" "}
                rolled a {roll}
              </p>
              {deleteButton}
            </div>
            <p className="text-gray-600 text-xs">
              {dayjs(createdAt).fromNow()}
            </p>
            <p className={likeCount < 1 || commentCount < 1 ? "mb-3" : ""}>
              <Fragment>{body}</Fragment>
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
              <button
                onClick={(e) => e.stopPropagation()}
                className="bg-transparent w-full hover:bg-blue-100 focus:outline-none text-gray-800 font-semibold py-1"
              >
                <FontAwesomeIcon icon={faCommentAlt} /> Comment
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <Modal
        outerClass="container mx-auto inset-x-0 outline-none overflow-x-hidden fixed w-100 z-50"
        innerClass=" bg-white rounded m-6 relative z-10"
        top="0"
        open={open}
        hideModal={toggleModal}
        portalEl={document.body}
      >
        <PostDialog postId={postId} userHandle={userHandle} />
      </Modal> */}
    </Fragment>
  );
};

export default Post;
