import React, { Fragment, useContext } from "react";
// import PostDialog from "./PostDialog";
import DeletePost from "./DeletePost";
import LikePost from "./LikePost";
import Context from "../../context/Context";
import { Link, useHistory } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt } from "pro-regular-svg-icons/faCommentAlt";
import { faHexagon } from "pro-solid-svg-icons/faHexagon";

const Post = (props) => {
  dayjs.extend(relativeTime);
  dayjs.extend(updateLocale);
  dayjs.updateLocale("en", {
    relativeTime: {
      future: "%s",
      past: "%s",
      s: "a few seconds",
      m: "1m",
      mm: "%dm",
      h: "1h",
      hh: "%dh",
      d: "1d",
      dd: "%dd",
      M: "1mo",
      MM: "%dmo",
    },
  });
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
      rollNeeded,
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
  const rollResult = (roll, rollNeeded) => {
    if (roll >= rollNeeded) {
      if (roll === 20) {
        return (
          <Fragment>
            <FontAwesomeIcon className="text-secondary-600" icon={faHexagon} />
            <span
              className="fa-layers-text text-white font-bold uppercase text-sm origin-left transform -rotate-45"
              style={{ left: "0.9rem" }}
            >
              Crit
            </span>
          </Fragment>
        );
      } else {
        return (
          <Fragment>
            <FontAwesomeIcon className="text-secondary-600" icon={faHexagon} />
            <span
              className="fa-layers-text text-white font-bold uppercase text-sm origin-left transform -rotate-45"
              style={{ left: "0.9rem" }}
            >
              Pass
            </span>
          </Fragment>
        );
      }
    } else {
      if (roll === 1) {
        return (
          <Fragment>
            <FontAwesomeIcon className="text-secondary-600" icon={faHexagon} />
            <span
              className="fa-layers-text text-white font-bold uppercase text-sm origin-left transform -rotate-45"
              style={{ left: "0.9rem" }}
            >
              Crit
            </span>
          </Fragment>
        );
      } else {
        return (
          <Fragment>
            <FontAwesomeIcon className="text-red-600" icon={faHexagon} />
            <span
              className="fa-layers-text text-white font-bold uppercase text-sm origin-left transform -rotate-45"
              style={{ left: "0.9rem" }}
            >
              Miss
            </span>
          </Fragment>
        );
      }
    }
  };
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
              <p className="text-gray-600">
                <Link
                  onClick={(e) => e.stopPropagation()}
                  className="text-gray-900 hover:underline font-bold leading-none"
                  to={`/users/${userHandle}`}
                >
                  {userHandle}
                </Link>{" "}
                {/* rolled a {roll} */}
                &middot;{" "}
                {dayjs(createdAt).isBefore(dayjs().subtract(1, "year"))
                  ? dayjs(createdAt).format("MMM D, YYYY")
                  : dayjs(createdAt).fromNow()}
              </p>
              {deleteButton}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-lg">{body}</p>
              {/* <p className={likeCount < 1 || commentCount < 1 ? "mb-3" : ""}>
                <Fragment>{body}</Fragment>
              </p> */}
              <div className="fa-3x">
                <span className="fa-layers fa-fw">
                  {rollResult(roll, rollNeeded)}
                </span>
              </div>
            </div>
            <p>
              {userHandle} rolled a {roll} needed a {rollNeeded} to pass
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
              <LikePost postId={postId} />
              <Link
                to={`/post/${postId}`}
                onClick={(e) => e.stopPropagation()}
                className="bg-transparent w-full hover:bg-blue-100 focus:outline-none text-gray-800 font-semibold py-1"
              >
                <FontAwesomeIcon icon={faCommentAlt} /> Comment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Post;
