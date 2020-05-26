import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceD20 } from "@fortawesome/pro-regular-svg-icons/faDiceD20";

function Navbar() {
  return (
    <div className="bg-white p-2 border-gray-200 border-b sticky top-0">
      <div className="container">
        <nav className="flex items-center justify-between flex-wrap ">
          <Link to={"/"} className="flex items-center flex-shrink-0">
            <FontAwesomeIcon
              icon={faDiceD20}
              size="2x"
              className="mr-2 text-primary-900"
            />
            <span className="font-semibold text-xl tracking-light text-gray-900">
              Logo
            </span>
          </Link>
          <div className="flex items-center text-white">
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
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
