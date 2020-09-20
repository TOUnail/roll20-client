import React, { Fragment } from "react";
import { createPortal } from "react-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "pro-solid-svg-icons/faTimes";

const Modal = ({
  open,
  hideModal,
  children,
  innerClass,
  outerClass,
  top,
  portalEl,
}) => {
  return open
    ? createPortal(
        <Fragment>
          <div
            onClick={(e) => e.stopPropagation()}
            className="fixed h-screen w-screen top-0 left-0 right-0 bottom-0 opacity-50 bg-gray-800 z-40"
          />
          <div
            className={outerClass}
            style={{ top: top }}
            aria-modal={true}
            aria-hidden={true}
            tabIndex={-1}
            role="dialog"
          >
            <div className={innerClass}>
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
        portalEl
      )
    : null;
};

export default Modal;
