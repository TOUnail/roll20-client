import React, { useContext } from "react";
import Context from "../context/Context";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "pro-regular-svg-icons/faSpinner";
import { faCameraAlt } from "pro-solid-svg-icons/faCameraAlt";

const Profile = () => {
  const profile = useContext(Context);
  const handleImageChange = (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    profile.uploadImage(formData);
  };
  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };
  return (
    <Context.Consumer>
      {(context) =>
        !context.loadingUser ? (
          context.authenticated ? (
            <div className="w-full">
              <div className="shadow bg-white p-4 my-2 sm:rounded-lg flex flex-col justify-between leading-normal">
                <div className="text-center">
                  <img
                    src={context.credentials.imageUrl}
                    alt="profile"
                    className="rounded-full w-20 h-20 object-cover mx-auto -mb-6"
                  />
                  <input
                    type="file"
                    id="imageInput"
                    hidden="hidden"
                    onChange={handleImageChange}
                  />
                  <button
                    onClick={handleEditPicture}
                    className="focus:outline-none block mx-auto"
                  >
                    <FontAwesomeIcon
                      className="text-gray-700"
                      icon={faCameraAlt}
                    />
                  </button>
                </div>
                <div className="text-center">
                  <h2 className="text-lg my-2">
                    <strong>{context.credentials.handle}</strong>
                  </h2>
                  {context.credentials.title && (
                    <p className="text-primary-900">
                      {context.credentials.title}
                    </p>
                  )}
                  {context.credentials.location && (
                    <p className="text-gray-600">
                      {context.credentials.location}
                    </p>
                  )}
                  {context.credentials.alignment && (
                    <p className="text-gray-600">
                      {context.credentials.alignment}
                    </p>
                  )}
                </div>
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
