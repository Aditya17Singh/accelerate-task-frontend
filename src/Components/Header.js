import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="bg-blue-200 p-5">
      {props.isLoggedIn ? (
        <AuthHeader
          Signout={props.Signout}
        />
      ) : (
        <NonAuthHeader />
      )}
    </header>
  );
}

function NonAuthHeader() {
  return (
    <>
      <div className="flex justify-end  mr-10">
        <Link
          exact="true"
          to="/"
          className="block font-medium text-black	hover:underline mr-5"
        >
          Home
        </Link>

        <Link
          exact="true"
          to="/signin"
          className="block  flex items-center text-sm  font-medium px-5 py-1 text-gray-700 dark:text-gray-200  mr-7 transition-colors duration-200 transform bg-gray-700 rounded-lg hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
        >
          SignIn
        </Link>

        <Link
          exact="true"
          to="/signup"
          className="flex items-center px-5 py-1 text-sm font-medium tracking-wide text-center text-white capitalize transition-colors duration-200 transform bg-gray-700 rounded-lg hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
        >
          SignUp
        </Link>
      </div>
    </>
  );
}
function AuthHeader(props) {
  return (
    <div className="flex mr-10 justify-end items-center ">
      <Link
        exact="true"
        to="/"
        className="block font-medium text-black hover:underline mr-5"
      >
        Home
      </Link>

      <Link
        exact="true"
        to="/"
        className="block font-medium text-black hover:underline"
        onClick={props.Signout}
      >
        Signout
      </Link>
    </div>
  );
}
export default Header;
