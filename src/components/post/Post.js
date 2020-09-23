import React, { Fragment, useContext } from "react";
// import PostDialog from "./PostDialog";
import DeletePost from "./DeletePost";
import LikeButton from "./LikeButton";
import Context from "../../context/Context";
import { Link, useHistory } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt } from "pro-regular-svg-icons/faCommentAlt";

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
            to={`/user/${userHandle}`}
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
              {dayjs(createdAt).isBefore(dayjs().subtract(1, "year"))
                ? dayjs(createdAt).format("MMM D, YYYY")
                : dayjs(createdAt).fromNow()}
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
              <LikeButton postId={postId} />
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
    </Fragment>
  );
};

export default Post;
