import React, { Fragment } from "react";
import Context from "../context/Context";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const PostDialog = () => {
  // const {
  //   post: {
  //     body,
  //     createdAt,
  //     userImage,
  //     userHandle,
  //     postId,
  //     likeCount,
  //     commentCount,
  //     roll,
  //   },
  // } = props;
  // TODO: Change close button to back arrow
  return (
    <Context.Consumer>
      {(context) => (
        <Fragment>
          <div className="pt-12 px-6 pb-6" style={{ height: "2000px" }}>
            {context.post.body}
          </div>
        </Fragment>
      )}
    </Context.Consumer>
  );
};

export default PostDialog;
