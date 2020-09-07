import React, { Fragment, useContext } from "react";
import Context from "../context/Context";
import Modal from "./Modal";
import useModal from "../util/useModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/pro-regular-svg-icons/faTrashAlt";

const DeletePost = (props) => {
  const { open, toggleModal } = useModal();
  const deletePost = useContext(Context);
  const clickedDeleteButton = () => {
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
        onClick={() => clickedDeleteButton()}
      >
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>

      <Modal open={open} hideModal={toggleModal}>
        <div className="pt-12 px-6 pb-6">
          <h5 className="font-bold">
            Are you sure you want to delete this post?
          </h5>
          <small className="text-gray-600">
            All comments and likes to this post will also be deleted.
          </small>
        </div>
        <button
          onClick={confirmDelete}
          className="text-white bg-red-600 hover:bg-red-800 font-bold py-4 w-full rounded-b"
        >
          Delete
        </button>
      </Modal>
    </Fragment>
  );
};

export default DeletePost;
