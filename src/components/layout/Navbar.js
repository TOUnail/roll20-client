import React, {
  Fragment,
  useState,
  useRef,
  useEffect,
  useContext,
} from "react";

import EditProfile from "../profile/EditProfile";
import Notifications from "./Notifications";
import Modal from "../Modal";
import useModal from "../../util/useModal";
import Context from "../../context/Context";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceD20 } from "pro-duotone-svg-icons/faDiceD20";
import { faCaretDown } from "pro-solid-svg-icons/faCaretDown";

const Navbar = () => {
  const [isMenuOpen, toggleIsMenuOpen] = useState(false);
  const { open, toggleModal } = useModal();
  const dropdownRef = useRef(null);
  const navbar = useContext(Context);
  const handleClickOutside = (e) => {
    if (!dropdownRef.current || !dropdownRef.current.contains(e.target)) {
      toggleIsMenuOpen(false);
    }
  };
  const handleMenuClick = () => {
    toggleIsMenuOpen(!isMenuOpen);
  };
  const editProfile = () => {
    toggleModal();
    toggleIsMenuOpen(false);
  };
  const handleLogout = () => {
    navbar.logoutUser();
    toggleIsMenuOpen(false);
  };
  const handleImageChange = (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    navbar.uploadImage(formData);
  };
  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
    toggleIsMenuOpen(false);
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });
  return (
    <div className="bg-gray-900 p-2 border-gray-200 border-b sticky top-0 z-40">
      <div className="container">
        <nav className="flex items-center justify-between flex-wrap ">
          <Link to={"/"} className="flex items-center flex-shrink-0">
            <FontAwesomeIcon
              icon={faDiceD20}
              size="2x"
              className="mr-2"
              style={{
                "--fa-primary-color": "#78387b",
                "--fa-secondary-color": "#ffffff",
                "--fa-primary-opacity": 1,
                "--fa-secondary-opacity": 1,
              }}
            />
            <span className="font-semibold text-xl tracking-light text-gray-200">
              Natural20
            </span>
          </Link>
          <div className="flex items-center text-white">
            <Context.Consumer>
              {(context) =>
                context.authenticated ? (
                  <Fragment>
                    <Notifications />
                    {/* <button className="px-3">
                      <FontAwesomeIcon icon={faBell} />
                    </button> */}
                    <div className="relative" ref={dropdownRef}>
                      <button
                        className="px-3 focus:outline-none"
                        onClick={handleMenuClick}
                      >
                        <FontAwesomeIcon
                          icon={faCaretDown}
                          className={isMenuOpen ? "text-primary-900" : ""}
                        />
                      </button>
                      {isMenuOpen && (
                        <div
                          className={`w-48 md:w-32 mt-3 py-1 absolute right-0 bg-white shadow-xl`}
                        >
                          <input
                            type="file"
                            id="imageInput"
                            hidden="hidden"
                            onChange={handleImageChange}
                          />
                          <button
                            onClick={() => handleEditPicture()}
                            className="block text-gray-800 px-4 py-1 w-full focus:outline-none hover:bg-primary-800 hover:text-white md:hidden"
                          >
                            Change Profile Image
                          </button>
                          <button
                            onClick={() => editProfile()}
                            className="block text-gray-800 px-4 py-1 w-full focus:outline-none hover:bg-primary-800 hover:text-white"
                          >
                            Edit Profile
                          </button>
                          {/* TODO: Move Modal away from EditDetails */}
                          {/* <EditDetails /> */}
                          <button
                            type="submit"
                            onClick={handleLogout}
                            className="block text-gray-800 px-4 py-1 w-full focus:outline-none hover:bg-primary-800 hover:text-white"
                          >
                            Logout
                          </button>
                        </div>
                      )}
                    </div>
                    <Modal
                      outerClass="flex justify-center inset-x-0 outline-none overflow-x-hidden overflow-y-auto fixed w-100 z-50"
                      innerClass="items-center bg-white rounded flex flex-col m-6 max-w-2xl relative z-10"
                      top="25%"
                      open={open}
                      hideModal={toggleModal}
                      portalEl={document.body}
                    >
                      <EditProfile hideModal={toggleModal} />
                    </Modal>
                  </Fragment>
                ) : (
                  <Fragment>
                    <Link
                      to={"/login"}
                      className="bg-gray-200 text-sm text-gray-900 py-1 px-2 rounded mr-2 font-semibold"
                    >
                      Log in
                    </Link>
                    <Link
                      to={"/signup"}
                      className="bg-primary-900 text-white text-sm font-semibold rounded py-1 px-2"
                    >
                      Sign up
                    </Link>
                  </Fragment>
                )
              }
            </Context.Consumer>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
