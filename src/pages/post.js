import React, {
  Fragment,
  useContext,
  useEffect,
  useCallback,
  useState,
} from "react";
import LikePost from "../components/post/LikePost";
import Comments from "../components/post/Comments";
import { Link } from "react-router-dom";
import Context from "../context/Context";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "pro-regular-svg-icons/faArrowLeft";
import { faCommentAlt } from "pro-regular-svg-icons/faCommentAlt";

const Post = (props) => {
  const [mount, setMount] = useState(false);
  dayjs.extend(relativeTime);
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
      setMount(true);
      fetchPost(postId);
    }
  }, [mount, fetchPost, postId]);
  return (
    <Context.Consumer>
      {(context) => (
        <Fragment>
          {!context.loadingUI ? (
            <Fragment>
              <div className="shadow bg-white px-4 pt-2 my-2 sm:rounded-lg leading-normal relative">
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
                      rolled a {context.post.roll}
                    </p>
                  </div>
                </div>
                <p className="text-2xl mb-2">{context.post.body}</p>
                <div className="flex flex-row justify-between items-baseline">
                  <div>
                    <p className="text-gray-600 text-xs">
                      {dayjs(context.post.createdAt).isBefore(
                        dayjs().subtract(1, "year")
                      )
                        ? dayjs(context.post.createdAt).format("MMM D, YYYY")
                        : dayjs(context.post.createdAt).fromNow()}
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
            </Fragment>
          ) : (
            <p>loading</p>
          )}
        </Fragment>
      )}
    </Context.Consumer>
  );
};

export default Post;
