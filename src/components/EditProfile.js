import React, { Fragment, useState, useEffect, useContext } from "react";
import Context from "../context/Context";

const EditProfile = (props) => {
  let [location, setLocation] = useState("");
  let [title, setTitle] = useState("");
  let [alignment, setAlignment] = useState("");
  const editProfile = useContext(Context);
  const handleSubmit = () => {
    const userDetails = {
      location: location,
      title: title,
      alignment: alignment,
    };
    editProfile.editUserDetails(userDetails);
    props.hideModal();
  };
  useEffect(() => {
    setLocation(
      editProfile.credentials.location ? editProfile.credentials.location : ""
    );
    setTitle(
      editProfile.credentials.title ? editProfile.credentials.title : ""
    );
    setAlignment(
      editProfile.credentials.alignment ? editProfile.credentials.alignment : ""
    );
  }, [editProfile]);
  return (
    <Context.Consumer>
      {(context) => (
        <Fragment>
          <div className="p-6">
            <h5 className="mb-3 font-bold">Edit Profile</h5>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="location"
              >
                Location
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="location"
                type="text"
                placeholder="Cupertino, CA"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                placeholder="Mage"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="alignment"
              >
                Alignment
              </label>
              <div className="relative">
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="alignment"
                  value={alignment}
                  onChange={(e) => setAlignment(e.target.value)}
                >
                  <option value="Lawful Good">Lawful Good</option>
                  <option value="Neutral Good">Neutral Good</option>
                  <option value="Chaotic Good">Chaotic Good</option>
                  <option value="Lawful Neutral">Lawful Neutral</option>
                  <option value="True Neutral">True Neutral</option>
                  <option value="Chaotic Neutral">Chaotic Neutral</option>
                  <option value="Lawful Evil">Lawful Evil</option>
                  <option value="Neutral Evil">Neutral Evil</option>
                  <option value="Chaotic Evil">Chaotic Evil</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="text-white bg-secondary-600 hover:bg-secondary-800 font-bold py-4 w-full rounded-b"
          >
            Save
          </button>
        </Fragment>
      )}
    </Context.Consumer>
  );
};

export default EditProfile;
