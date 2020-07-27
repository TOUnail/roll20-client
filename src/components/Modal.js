import React, { Fragment } from "react";
import { createPortal } from "react-dom";
// https://medium.com/swlh/building-modals-in-react-64d92591f4b
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
              <div className="p-6">{children}</div>
              <button onClick={hideModal}>Close</button>
            </div>
          </div>
        </Fragment>,
        document.body
      )
    : null;
};

export default Modal;
