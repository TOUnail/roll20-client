import React, { Fragment } from "react";

// import Context from "../../context/Context";

const Comments = (props) => {
  const { comments } = props;
  // const commentContext = useContext(Context);
  return (
    <Fragment>
      {comments &&
        comments.map((comment) => {
          const { body, createdAt, userImage, userHandle } = comment;
          return (
            <Fragment key={createdAt}>
              <div
                className="shadow bg-white px-4 pt-4 -mt-4 sm:rounded-b-lg leading-normal relative"
                style={{ zIndex: -1 }}
              >
                <p>{body}</p>
                <p>{createdAt}</p>
              </div>
            </Fragment>
          );
        })}
    </Fragment>
  );
};

export default Comments;
