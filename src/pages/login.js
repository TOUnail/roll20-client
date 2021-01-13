import React, { useState, useContext } from "react";
import Context from "../context/Context";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceD20 } from "pro-regular-svg-icons/faDiceD20";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };
    login.loginUser(userData, props.history);
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
              <div className="mb-2">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={context.errors ? "mb-4" : "mb-8"}>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  value={password}
                  placeholder="******************"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {context.errors && (
                <p className="text-center text-red-500 text-xs italic mb-2">
                  {context.errors.general}
                </p>
              )}
              <button
                className={`text-white font-bold py-1 px-4 rounded w-full focus:outline-none focus:shadow-outline ${
                  email === "" || password === ""
                    ? "bg-primary-500 cursor-default"
                    : "bg-primary-700"
                }`}
                type="submit"
                disabled={email === "" || password === "" || context.loadingUI}
              >
                {!context.loadingUI ? (
                  "Sign In"
                ) : (
                  <FontAwesomeIcon icon={faDiceD20} spin />
                )}
              </button>
              <div className="text-center mt-8">
                <a
                  className="text-sm text-primary-500 hover:text-primary-800"
                  href="/"
                >
                  Forgot Password?
                </a>
              </div>
            </form>
            <div className="bg-white shadow-md rounded px-8 py-6 mb-4 text-center">
              <p>
                Don't have an account?{" "}
                <Link
                  className="text-primary-500 hover:text-primary-800"
                  to={"/signup"}
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </Context.Consumer>
  );
};

export default Login;
