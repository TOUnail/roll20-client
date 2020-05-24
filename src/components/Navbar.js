import React from "react";

function Navbar() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-light">Logo</span>
      </div>
    </nav>
  );
}

export default Navbar;
