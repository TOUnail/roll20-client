import React, { Fragment, useContext } from "react";
import Context from "../../context/Context";
import Modal from "../Modal";
import useModal from "../../util/useModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "pro-regular-svg-icons/faTrashAlt";

const DeletePost = (props) => {
  const { open, toggleModal } = useModal();
  const deletePost = useContext(Context);
  const clickedDeleteButton = (e) => {
    e.stopPropagation();
    toggleModal();
  };
  const confirmDelete = () => {
    deletePost.deletePost(props.postId);
    toggleModal();
  };
  return (
    <Fragment>
      <button
        className="focus:outline-none hover:text-red-800 focus:text-red-800"
        onClick={(e) => clickedDeleteButton(e)}
      >
        <FontAwesomeIcon icon={faTrashAlt} />
        <span className="sr-only">Delete Post</span>
      </button>

      <Modal
        outerClass="flex justify-center inset-x-0 outline-none overflow-x-hidden overflow-y-auto fixed w-100 z-40"
        innerClass="items-center bg-white rounded flex flex-col m-6 max-w-2xl relative z-10"
        top="25%"
        open={open}
        hideModal={(e) => {
          e.stopPropagation();
          toggleModal();
        }}
        portalEl={document.body}
      >
        <div className="pt-12 px-6 pb-6" onClick={(e) => e.stopPropagation()}>
          <h5 className="font-bold">
            Are you sure you want to delete this post?
          </h5>
          <small className="text-gray-600">
            All comments and likes to this post will also be deleted.
          </small>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            confirmDelete();
          }}
          className="text-white bg-red-600 hover:bg-red-800 font-bold py-4 w-full rounded-b"
        >
          Delete
        </button>
      </Modal>
    </Fragment>
  );
};

export default DeletePost;
