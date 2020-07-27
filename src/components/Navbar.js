import React, {
  Fragment,
  useState,
  useRef,
  useEffect,
  useContext,
} from "react";

import Modal from "./Modal";
import useModal from "../util/useModal";
import Context from "../context/Context";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceD20 } from "@fortawesome/pro-duotone-svg-icons/faDiceD20";
import { faBell } from "@fortawesome/pro-solid-svg-icons/faBell";
import { faCaretDown } from "@fortawesome/pro-solid-svg-icons/faCaretDown";

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
    console.log("clicked");
    toggleModal();
    toggleIsMenuOpen(false);
  };
  const handleLogout = () => {
    navbar.logoutUser();
    toggleIsMenuOpen(false);
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });
  return (
    <div className="bg-gray-900 p-2 border-gray-200 border-b sticky top-0">
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
              Logo
            </span>
          </Link>
          <div className="flex items-center text-white">
            <Context.Consumer>
              {(context) =>
                context.authenticated ? (
                  <Fragment>
                    <button className="px-3">
                      <FontAwesomeIcon icon={faBell} />
                    </button>
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
                          className={`w-32 mt-3 py-1 absolute right-0 bg-white shadow-xl`}
                        >
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
                    <Modal open={open} hideModal={toggleModal}>
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
                          >
                            <option>New Mexico</option>
                            <option>Missouri</option>
                            <option>Texas</option>
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
