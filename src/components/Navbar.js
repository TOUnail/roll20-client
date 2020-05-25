import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceD20 } from "@fortawesome/pro-regular-svg-icons/faDiceD20";

function Navbar() {
  return (
    <div className="bg-primary p-3">
      <div className="container">
        <nav className="flex items-center justify-between flex-wrap ">
          <div className="flex items-center flex-shrink-0 text-white">
            <FontAwesomeIcon icon={faDiceD20} size="2x" className="mr-2" />
            <span className="font-semibold text-xl tracking-light">Logo</span>
          </div>
          <div>Login/Sign Up</div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
