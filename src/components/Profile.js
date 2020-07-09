import React from "react";
import Context from "../context/Context";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/pro-regular-svg-icons/faSpinner";

const Profile = () => {
  return (
    <Context.Consumer>
      {(context) =>
        !context.loadingData ? (
          context.authenticated ? (
            <div className="w-full">
              <div className="shadow bg-white p-4 my-2 sm:rounded-lg flex flex-col justify-between leading-normal">
                <img
                  src={context.credentials.imageUrl}
                  alt="profile"
                  className="rounded-full w-20 h-20 mx-auto mb-2"
                />
                <div className="text-center">
                  <h2 className="text-lg">
                    <strong>{context.credentials.handle}</strong>
                  </h2>
                </div>
                {context.credentials.alignment && (
                  <p>{context.credentials.alignment}</p>
                )}
                {context.credentials.title && (
                  <p>{context.credentials.title}</p>
                )}
              </div>
            </div>
          ) : (
            <div className="w-full">
              <div className="shadow bg-white p-4 my-2 sm:rounded-lg flex flex-col justify-between leading-normal">
                <h2 className="text-lg">
                  <strong>New to Nat20?</strong>
                </h2>
                <p className="mb-2 text-sm">
                  Sign up now to start rolling crits.
                </p>
                <Link
                  to={"/signup"}
                  className="bg-primary-900 text-center text-white font-semibold rounded py-2"
                >
                  Sign up
                </Link>
              </div>
            </div>
          )
        ) : (
          <div className="text-center mt-4">
            <FontAwesomeIcon
              size="3x"
              icon={faSpinner}
              className="text-gray-400"
              spin
            />
          </div>
        )
      }
    </Context.Consumer>
  );
};

export default Profile;
