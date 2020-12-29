import React, { Fragment, useEffect, useState, useContext } from "react";
import StaticProfile from "../components/profile/StaticProfile";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import Context from "../context/Context";
import Post from "../components/post/Post";
import Comments from "../components/post/Comments";
import CommentForm from "../components/post/CommentForm";

import LikePost from "../components/post/LikePost";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "pro-regular-svg-icons/faArrowLeft";
import { faCommentAlt } from "pro-regular-svg-icons/faCommentAlt";
import { faHexagon } from "pro-solid-svg-icons/faHexagon";

const User = (props) => {
  const [mount, setMount] = useState(false);
  const [profile, setProfile] = useState(null);
  const [postIdParam, setPostIdParam] = useState(null);
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
  const userPosts = useContext(Context);
  const handle = props.match.params.handle;
  const postId = props.match.params.postId;

  useEffect(() => {
    if (!mount) {
      setMount(true);
      if (postId) {
        setPostIdParam(postId);
        userPosts.getPost(postId);
      }
      userPosts.getUserPageData(handle);
      // fetchUser(handle);
      fetch(`/user/${handle}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data.userInfo.user);
          setProfile({ ...data.userInfo.user });
          // console.log(profile)
        });
    }
  }, [mount, handle, profile, userPosts, postId]);

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
            {context.loadingUI ? (
              <div>loading</div>
            ) : context.posts === null ? (
              <div>No posts from this user</div>
            ) : !postIdParam ? (
              // maps all posts (/user/:handle)
              context.posts.map((post) => (
                <Post key={post.postId} post={post} />
              ))
            ) : context.posts.some((post) => post.postId === postIdParam) ? (
              <Fragment>
                <div className="shadow bg-white px-4 pt-2 my-2 sm:rounded-lg leading-normal relative z-20">
                  <Link
                    className="rounded-full py-1 px-2 mb-2 inline-block text-primary-600 hover:bg-gray-300 focus:outline-none"
                    to={`/user/${context.post.userHandle}`}
                  >
                    <FontAwesomeIcon icon={faArrowLeft} />
                    <span className="sr-only">Back</span>
                  </Link>
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
              <div>Post was not found or deleted from this user</div>
            )}
          </div>
          <div className="col-span-1">
            {profile === null ? (
              <p>Loading profile</p>
            ) : (
              <StaticProfile profile={profile} />
            )}
          </div>
        </Fragment>
      )}
    </Context.Consumer>
  );
};

export default User;
