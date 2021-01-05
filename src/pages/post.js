import React, {
  Fragment,
  useContext,
  useEffect,
  useCallback,
  useState,
} from "react";
import LikePost from "../components/post/LikePost";
import Comments from "../components/post/Comments";
import CommentForm from "../components/post/CommentForm";
import { Link } from "react-router-dom";
import Profile from "../components/profile/Profile";
import Context from "../context/Context";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "pro-regular-svg-icons/faArrowLeft";
import { faCommentAlt } from "pro-regular-svg-icons/faCommentAlt";
import { faHexagon } from "pro-solid-svg-icons/faHexagon";

const Post = (props) => {
  const [mount, setMount] = useState(false);
  const [id, setId] = useState("");
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
  const singlePost = useContext(Context);
  const { postId } = props.match.params;
  const fetchPost = useCallback(
    (postId) => {
      singlePost.getPost(postId);
    },
    [singlePost]
  );
  useEffect(() => {
    if (!mount) {
      setId(postId);
      setMount(true);
      fetchPost(postId);
    }
    // if user goes from one post to another through notifications
    if (id !== postId) {
      setMount(false);
    }
  }, [mount, fetchPost, postId, id]);

  const rollResult = (roll, rollNeeded) => {
    if (roll >= rollNeeded) {
      if (roll === 20) {
        return (
          <Fragment>
            <FontAwesomeIcon className="text-secondary-600" icon={faHexagon} />
            <span
              className="fa-layers-text text-white font-bold uppercase text-sm origin-left transform -rotate-45"
              style={{ left: "1.1rem" }}
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
              style={{ left: "1.1rem" }}
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
              style={{ left: "1.1rem" }}
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
              style={{ left: "1.1rem" }}
            >
              Miss
            </span>
          </Fragment>
        );
      }
    }
  };
  return (
    <Context.Consumer>
      {(context) => (
        <Fragment>
          <div className="col-span-1 md:col-span-2 post-lists relative">
            {!context.loadingUI ? (
              <Fragment>
                <div className="shadow bg-white px-4 pt-2 my-2 sm:rounded-lg leading-normal relative z-20">
                  <button
                    className="rounded-full mb-2 p-2 flex items-center justify-center text-primary-600 hover:bg-gray-300 focus:outline-none"
                    onClick={props.history.goBack}
                  >
                    <FontAwesomeIcon icon={faArrowLeft} />
                    <span className="sr-only">Back</span>
                  </button>
                  <hr className="-mx-4" />
                  <div className="flex mt-3">
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={context.post.userImage}
                      alt={`${context.post.userHandle}`}
                    />
                    <div className="text-left ml-3">
                      <p className="text-gray-900 leading-none">
                        <Link to={`/user/${context.post.userHandle}`}>
                          <strong>{context.post.userHandle}</strong>
                        </Link>{" "}
                        &middot;{" "}
                        <span className="text-gray-600 text-xs">
                          {dayjs(context.post.createdAt).isBefore(
                            dayjs().subtract(1, "year")
                          )
                            ? dayjs(context.post.createdAt).format(
                                "MMM D, YYYY"
                              )
                            : dayjs(context.post.createdAt).fromNow()}
                        </span>
                        {/* rolled a {context.post.roll}
                      <br />
                      {context.post.rollNeeded} */}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl">{context.post.body}</p>
                    <div className="fa-3x">
                      <span className="fa-layers fa-fw">
                        {rollResult(context.post.roll, context.post.rollNeeded)}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between items-baseline">
                    <div>
                      <p>
                        {context.post.userHandle} rolled a {context.post.roll}{" "}
                        needed a {context.post.rollNeeded} to pass
                      </p>
                    </div>

                    <div>
                      {context.post.likeCount > 0 && (
                        <p
                          className={`text-xs text-gray-600${
                            context.post.commentCount > 0 ? " mr-3" : ""
                          }`}
                        >
                          {context.post.likeCount} Like
                          {context.post.likeCount > 1 ? "s" : ""}
                        </p>
                      )}
                      {context.post.commentCount > 0 && (
                        <p className="text-xs text-gray-600">
                          {context.post.commentCount} Comment
                          {context.post.commentCount > 1 ? "s" : ""}
                        </p>
                      )}
                    </div>
                  </div>
                  <hr />
                  <div className="flex justify-around">
                    <LikePost postId={postId} />
                    <button className="bg-transparent w-full hover:bg-blue-100 focus:outline-none text-gray-800 font-semibold py-1">
                      <FontAwesomeIcon icon={faCommentAlt} /> Comment
                    </button>
                  </div>
                </div>
                <Comments comments={context.post.comments} />
                {context.authenticated && <CommentForm postId={postId} />}
              </Fragment>
            ) : (
              <p>loading</p>
            )}
          </div>

          <div className="col-span-1">
            <Profile />
          </div>
        </Fragment>
      )}
    </Context.Consumer>
  );
};

export default Post;
