import React, { Fragment, useContext, useState } from "react";
import Context from "../context/Context";

import Modal from "./Modal";
import useModal from "../util/useModal";

const AddPost = () => {
  const addPost = useContext(Context);
  const { open, toggleModal } = useModal();
  const [messageBody, setMessageBody] = useState("");

  const clickedAddPost = () => {
    window.scrollTo(0, 0);
    toggleModal();
  };
  const handleChange = (e) => {
    setMessageBody(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      addPost.addPost({ body: messageBody });
      toggleModal();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Context.Consumer>
      {(context) => (
        <Fragment>
          <div onClick={() => clickedAddPost()}>
            <div className="shadow bg-white px-4 pb-4 my-2 sm:rounded-lg flex flex-col justify-between leading-normal">
              <p className="text-sm font-bold my-2 cursor-pointer">
                Create a post
              </p>
              <div className="flex items-center">
                <img
                  src={context.credentials.imageUrl}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover mr-4 cursor-pointer"
                />
                <p className="text-gray-600 w-full cursor-text">
                  What's your action?
                </p>
              </div>
            </div>
          </div>
          <div className="container absolute top-0">
            <div className="grid grid-cols-1 gap-4">
              <div className="col-span-1 modal-anchor">
                <Modal
                  outerClass="z-50 absolute w-full focus:outline-none"
                  innerClass="bg-white sm:rounded-lg relative z-10"
                  open={open}
                  top="0.5rem"
                  hideModal={toggleModal}
                  portalEl={document.querySelector(".modal-anchor")}
                >
                  <form onSubmit={handleSubmit}>
                    <div className="px-4 pb-4 flex flex-col justify-between leading-normal">
                      <p className="text-sm font-bold my-2">Create a post</p>
                      <div className="flex items-center">
                        <img
                          src={context.credentials.imageUrl}
                          alt="profile"
                          className="w-10 h-10 rounded-full object-cover mr-4 cursor-pointer"
                        />
                        <textarea
                          autoFocus
                          placeholder="What's your action?"
                          className="flex-1 py-2 px-3 resize-none text-gray-700 focus:outline-none"
                          rows="1"
                          onChange={handleChange}
                        ></textarea>
                        {/* <p className="text-gray-600 w-full cursor-text">
                  What's your action?
                </p> */}
                      </div>
                    </div>
                    <button
                      type="submit"
                      className={`text-white font-bold py-4 w-full sm:rounded-b-lg${
                        messageBody === ""
                          ? " bg-secondary-400 cursor-default"
                          : " bg-secondary-600 hover:bg-secondary-800 "
                      }`}
                      disabled={messageBody === ""}
                    >
                      Roll
                    </button>
                  </form>
                </Modal>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Context.Consumer>
  );
};

export default AddPost;
