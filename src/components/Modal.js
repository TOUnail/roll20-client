import React, { Fragment } from "react";
import { createPortal } from "react-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/pro-solid-svg-icons/faTimes";

const Modal = ({ open, hideModal, children }) => {
  return open
    ? createPortal(
        <Fragment>
          <div className="fixed h-screen w-screen top-0 left-0 opacity-50 z-20 bg-gray-800" />
          <div
            className="flex justify-center inset-x-0 outline-none overflow-x-hidden overflow-y-auto fixed w-100 z-30"
            style={{ top: "25%" }}
            aria-modal={true}
            aria-hidden={true}
            tabIndex={-1}
            role="dialog"
          >
            <div className="items-center bg-white rounded flex flex-col m-6 max-w-2xl relative z-10">
              <button
                className="absolute text-gray-600 hover:text-gray-700 focus:outline-none"
                style={{ top: "1rem", right: "1rem" }}
                onClick={hideModal}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
              {children}
            </div>
          </div>
        </Fragment>,
        document.body
      )
    : null;
};

export default Modal;
