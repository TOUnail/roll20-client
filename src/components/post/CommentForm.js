import React, { useState, useContext } from "react";

import Context from "../../context/Context";

const CommentForm = (props) => {
  const [commentBody, setCommentBody] = useState("");
  const [errors, setErrors] = useState("");
  const addComment = useContext(Context);
  const handleChange = (e) => {
    setErrors("");
    setCommentBody(e.target.value);
  };
  const handleSubmit = () => {
    //console.log(commentBody);
    addComment.postComment(props.postId, { body: commentBody });
    setCommentBody("");
  };
  const onEnterPress = (e) => {
    if (e.key === "Enter" && e.shiftKey === false) {
      if (commentBody !== "") {
        e.preventDefault();
        handleSubmit();
      } else {
        e.preventDefault();
        setErrors("Must not be empty");
      }
    }
  };
  return (
    <Context.Consumer>
      {(context) => (
        <div
          className="shadow bg-white pt-4 pb-2 px-4 -mt-4 sm:rounded-b-lg leading-normal"
          style={{ zIndex: 9 }}
        >
          <div className="flex items-center mt-3">
            <img
              className="w-10 h-10 rounded-full mr-4 object-cover"
              src={context.credentials.imageUrl}
              alt={context.credentials.handle}
            />
            <form className="w-full" onKeyPress={onEnterPress}>
              <textarea
                className="appearance-none w-full block bg-gray-200 text-gray-700 border border-gray-500 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 resize-none"
                rows="1"
                placeholder="Write a comment..."
                onChange={handleChange}
                value={commentBody}
              />
              {errors && <p>{errors}</p>}
            </form>
          </div>
        </div>
      )}
    </Context.Consumer>
  );
};

export default CommentForm;
