import React, { useContext } from "react";
import Context from "../context/Context";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/pro-regular-svg-icons/faSpinner";
import { faCameraAlt } from "@fortawesome/pro-solid-svg-icons/faCameraAlt";

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
        !context.loadingData ? (
          context.authenticated ? (
            <div className="w-full">
              <div className="shadow bg-white p-4 my-2 sm:rounded-lg flex flex-col justify-between leading-normal">
                <div className="relative">
                  <img
                    src={context.credentials.imageUrl}
                    alt="profile"
                    className="rounded-full w-20 h-20 mx-auto mb-2"
                  />
                  <input
                    type="file"
                    id="imageInput"
                    hidden="hidden"
                    onChange={handleImageChange}
                  />
                  <button
                    onClick={handleEditPicture}
                    className="focus:outline-none absolute"
                    style={{ left: "48%", bottom: "0.5rem" }}
                  >
                    <FontAwesomeIcon
                      className="text-gray-700"
                      icon={faCameraAlt}
                    />
                  </button>
                </div>
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
