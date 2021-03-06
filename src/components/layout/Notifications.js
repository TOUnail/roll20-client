import React, {
  Fragment,
  useState,
  useEffect,
  useRef,
  useContext,
} from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "pro-solid-svg-icons/faBell";
import { faCommentAlt } from "pro-regular-svg-icons/faCommentAlt";
import { faHeart } from "pro-regular-svg-icons/faHeart";

import Context from "../../context/Context";

const Notifications = () => {
  const [isMenuOpen, toggleIsMenuOpen] = useState(false);
  dayjs.extend(relativeTime);
  dayjs.extend(updateLocale);
  dayjs.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: "a few seconds",
      m: "a minute",
      mm: "%d minutes",
      h: "an hour",
      hh: "%d hours",
      d: "a day",
      dd: "%d days",
      M: "a month",
      MM: "%d months",
      y: "a year",
      yy: "%d years",
    },
  });
  const dropdownRef = useRef(null);
  const notifications = useContext(Context);
  const handleMenuClick = () => {
    toggleIsMenuOpen(!isMenuOpen);
    markAllAsRead();
  };
  const handleClickOutside = (e) => {
    if (!dropdownRef.current || !dropdownRef.current.contains(e.target)) {
      toggleIsMenuOpen(false);
    }
  };
  // const handleNotificationClick = (id) => {
  //   notifications.markNotificationsRead([id]);
  //   toggleIsMenuOpen(!isMenuOpen);
  // };
  const markAllAsRead = () => {
    let unreadNotificationsIds = notifications.notifications
      .filter((notif) => !notif.read)
      .map((notif) => notif.notificationId);
    notifications.markNotificationsRead(unreadNotificationsIds);
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
            <button
              className="px-3 focus:outline-none"
              onClick={handleMenuClick}
            >
              <FontAwesomeIcon icon={faBell} />
            </button>
            {context.notifications &&
              context.notifications.filter((notif) => notif.read === false)
                .length > 0 && (
                <span
                  className="flex absolute top-0"
                  style={{ right: "0.5rem" }}
                >
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                </span>
              )}
            {isMenuOpen && (
              <div
                className="mt-3 absolute right-0 bg-white shadow-xl"
                style={{ width: "20rem" }}
              >
                {context.notifications && context.notifications.length > 0 ? (
                  <ul>
                    {/* {context.notifications.filter((notif) => !notif.read)
                      .length > 0 && (
                      <li>
                        <button
                          className="text-gray-800 p-2 block hover:bg-gray-100"
                          onClick={markAllAsRead}
                        >
                          Mark All As Read
                        </button>
                      </li>
                    )} */}
                    {context.notifications.map((notification) => {
                      const verb =
                        notification.type === "like" ? "liked" : "commented on";
                      const noun =
                        notification.commentId !== undefined
                          ? "comment"
                          : "post";
                      const time = dayjs(notification.createdAt).fromNow();
                      // const read = notification.read ? "primary" : "";
                      const icon = (
                        <FontAwesomeIcon
                          className="mx-3"
                          icon={
                            notification.type === "like"
                              ? faHeart
                              : faCommentAlt
                          }
                        />
                      );
                      return (
                        <li key={notification.createdAt}>
                          <Link
                            className="text-gray-800 p-2 block hover:bg-gray-100"
                            to={`/post/${notification.postId}`}
                            // onClick={() =>
                            //   handleNotificationClick(
                            //     notification.notificationId
                            //   )
                            // }
                            onClick={handleMenuClick}
                          >
                            <div className="flex items-center">
                              {icon}
                              <div>
                                <p className="leading-snug">
                                  <strong>{notification.sender}</strong>{" "}
                                  {`${verb} your ${noun}`}
                                  <br />
                                  <small>{time}</small>
                                </p>
                              </div>
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-gray-800 p-3 text-center">
                    You have no notifications
                  </p>
                )}
              </div>
            )}
          </Fragment>
        )}
      </Context.Consumer>
    </div>
  );
};

export default Notifications;
