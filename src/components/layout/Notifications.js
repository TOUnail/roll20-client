import React, { Fragment, useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "pro-solid-svg-icons/faBell";
import { faCommentAlt } from "pro-regular-svg-icons/faCommentAlt";
import { faHeart } from "pro-regular-svg-icons/faHeart";

import Context from "../../context/Context";

const Notifications = () => {
  const [isMenuOpen, toggleIsMenuOpen] = useState(false);
  dayjs.extend(relativeTime);
  const dropdownRef = useRef(null);
  const notifications = useContext(Context);
  const handleMenuClick = () => {
    toggleIsMenuOpen(!isMenuOpen);
  };
  const handleClickOutside = (e) => {
    if (!dropdownRef.current || !dropdownRef.current.contains(e.target)) {
      toggleIsMenuOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });
  return (
    <div className="relative" ref={dropdownRef}>
      <Context.Consumer>
      {(context) => (
        <Fragment>
          
          
           {context.notifications && context.notifications.length > 0 ? (
               <Fragment>
            <button className="px-3 focus:outline-none" onClick={handleMenuClick}>
               <FontAwesomeIcon icon={faBell} />
             </button>
            <span className="flex absolute top-0" style={{right: '0.5rem'}}>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
             
            {isMenuOpen && (
              <div
                className={`w-32 mt-3 py-1 absolute right-0 bg-white shadow-xl`}
              >
                {context.notifications && context.notifications.length > 0 ? (
                <ul>
                  {context.notifications.map(notification => {
                      const verb = notification.type === 'like' ? 'liked' : 'commented on';
                      const noun = notification.commentId !== undefined ? 'comment' : 'post'
                      const time = dayjs(notification.createdAt).fromNow();
                      const read = notification.read ? 'primary' : '';
                      const icon = notification.type === 'like' ? (
                          <FontAwesomeIcon icon={faHeart} />
                      ) : (
                        <FontAwesomeIcon icon={faCommentAlt} />
                      )
                      return (
                          <li key={notification.createdAt}><Link className="text-gray-800" to={`/post/${notification.postId}`}>{icon} {`${notification.sender} ${verb} your ${noun}`}</Link></li>
                      )
                  })}
                </ul>
                ) : (
                    <p>You have no notifications</p>
                )
                }
              </div>
            )}
            </Fragment>
           ) : (
            <FontAwesomeIcon icon={faBell} />
           )
        }
        </Fragment>
      )}
      </Context.Consumer>
    </div>
  );
};

export default Notifications;
