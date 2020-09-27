import React, { Fragment, useContext } from "react";
import LikeComment from "./LikeComment";
import DeleteComment from "./DeleteComment";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import Context from "../../context/Context";

const Comments = (props) => {
  dayjs.extend(relativeTime);
  const { comments } = props;
  const commentContext = useContext(Context);
  // const deleteButton =
  //   commentContext.authenticated &&
  //   commentContext.credentials.handle === comments.userHandle ? (
  //     <DeleteComment commentId={comments.commentId} />
  //   ) : null;
  return (
    <Fragment>
      {comments && comments.length > 0 && (
        <div className="shadow bg-white pt-4 px-4 -mt-4 sm:rounded-b-lg leading-normal">
          {comments.map((comment, index) => {
            const {
              body,
              createdAt,
              userImage,
              userHandle,
              likeCount,
              commentId,
            } = comment;
            return (
              <Fragment key={createdAt}>
                {index > 0 && <hr className="-mx-4" />}
                <div className="flex item-center mt-3">
                  <img
                    className="w-10 h-10 rounded-full mr-4 object-cover"
                    src={userImage}
                    alt={userHandle}
                  />
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <p>
                        <strong className="mr-1">
                          <Link
                            className="cursor-pointer"
                            to={`/user/${userHandle}`}
                          >
                            {userHandle}
                          </Link>
                        </strong>{" "}
                        {body}
                      </p>
                      {commentContext.authenticated &&
                      commentContext.credentials.handle === userHandle ? (
                        <DeleteComment commentId={commentId} />
                      ) : null}
                      {/* <button className="focus:outline-none hover:text-red-800 focus:text-red-800">
                        d
                      </button> */}
                    </div>
                    <div className="flex">
                      <p className="text-xs text-gray-600">
                        {dayjs(createdAt).isBefore(dayjs().subtract(1, "year"))
                          ? dayjs(createdAt).format("MMM D, YYYY")
                          : dayjs(createdAt).fromNow()}
                      </p>
                      <p className="text-xs text-gray-600 ml-2">
                        {likeCount} Likes
                      </p>
                    </div>
                    <LikeComment commentId={commentId} />
                  </div>
                </div>
              </Fragment>
            );
          })}
        </div>
      )}
    </Fragment>
  );
};

export default Comments;
