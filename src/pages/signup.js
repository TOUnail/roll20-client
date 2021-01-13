import React, { useState, useContext } from "react";
import Context from "../context/Context";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceD20 } from "pro-regular-svg-icons/faDiceD20";

const Signup = (props) => {
  const signup = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [handle, setHandle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUserData = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      handle: handle,
    };
    signup.signupUser(newUserData, props.history);
  };

  return (
    <Context.Consumer>
      {(context) => (
        <div className="container">
          <div className="w-full max-w-xs mx-auto flex flex-col justify-center h-screen">
            <form
              noValidate
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              <div className="flex items-center justify-center mb-8">
                <FontAwesomeIcon
                  icon={faDiceD20}
                  size="2x"
                  className="mr-2 text-primary-900"
                />
                <span className="font-semibold text-xl tracking-light text-gray-900">
                  Natural20
                </span>
              </div>
              <div className="mb-4">
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline${
                    context.errors.email ? " border border-red-500" : ""
                  }`}
                  id="email"
                  type="email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline${
                    context.errors.handle ? " border border-red-500" : ""
                  }`}
                  id="handle"
                  type="text"
                  value={handle}
                  placeholder="Username"
                  onChange={(e) => setHandle(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  value={password}
                  placeholder="******************"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div
                className={
                  context.errors.email || context.errors.handle
                    ? "mb-2"
                    : "mb-8"
                }
              >
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword${
                context.errors.confirmPassword ? " border border-red-500" : ""
              }`}
                  type="password"
                  value={confirmPassword}
                  placeholder="******************"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {context.errors.email && (
                <p className="text-center text-red-500 text-xs italic mb-2">
                  {context.errors.email}
                </p>
              )}
              {context.errors.handle && (
                <p className="text-center text-red-500 text-xs italic mb-2">
                  {context.errors.handle}
                </p>
              )}
              {context.errors.confirmPassword && (
                <p className="text-center text-red-500 text-xs italic mb-2">
                  {context.errors.confirmPassword}
                </p>
              )}
              <button
                className={`text-white font-bold py-1 px-4 rounded w-full focus:outline-none focus:shadow-outline ${
                  email === "" ||
                  password === "" ||
                  confirmPassword === "" ||
                  handle === ""
                    ? "bg-primary-500 cursor-default"
                    : "bg-primary-700"
                }`}
                type="submit"
                disabled={
                  email === "" ||
                  password === "" ||
                  confirmPassword === "" ||
                  handle === "" ||
                  context.loadingUI
                }
              >
                {!context.loadingUI ? (
                  "Sign up"
                ) : (
                  <FontAwesomeIcon icon={faDiceD20} spin />
                )}
              </button>
            </form>
            <div className="bg-white shadow-md rounded px-8 py-6 mb-4 text-center">
              <p>
                Have an account?{" "}
                <Link
                  className="text-primary-500 hover:text-primary-800"
                  to={"/login"}
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </Context.Consumer>
  );
};

export default Signup;
