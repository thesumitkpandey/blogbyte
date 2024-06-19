import { Link, NavLink } from "react-router-dom";
import { FcSearch } from "react-icons/fc";
import { IoMenu, IoClose } from "react-icons/io5"; // Import close icon
import categories from "../utils/categories";
import { useState } from "react";
import { useSelector } from "react-redux";
import logo from "../assets/logo.png";
import ProfilePopUp from "./ProfilePopUp";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isProfilePopUpOpen, setIsProfilePopUpOpen] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);

  function onHamburgerClick() {
    setOpen(!open);
  }

  return (
    <nav className="bg-white p-2 shadow-lg sticky top-0 w-full flex justify-between items-center z-50">
      <div className="flex items-center">
        <Link to="/" className="flex-shrink-0">
          <img className="h-10 w-auto rounded-md" src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="hidden md:flex flex-grow justify-center items-center">
        <ul className="flex space-x-6">
          {categories.map((category) => (
            <li key={category} className="text-2xl">
              <NavLink
                to={`/${category}`}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-bold"
                    : "text-gray-700 hover:text-blue-600 transition duration-300 ease-in-out"
                }
              >
                {category}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center space-x-4">
        <FcSearch className="text-2xl cursor-pointer" />
        {currentUser ? (
          <img
            src={currentUser.avatar}
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => setIsProfilePopUpOpen(!isProfilePopUpOpen)}
            alt="User Avatar"
          />
        ) : (
          <Link to="/signin">
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded transition duration-300 ease-in-out">
              Sign in
            </button>
          </Link>
        )}
        {isProfilePopUpOpen && (
          <ProfilePopUp
            currentUser={currentUser}
            setIsProfilePopUpOpen={setIsProfilePopUpOpen}
            isProfilePopUpOpen={isProfilePopUpOpen}
          />
        )}
        <IoMenu
          className="text-3xl md:hidden cursor-pointer"
          onClick={onHamburgerClick}
        />
      </div>
      <div
        className={`fixed top-0 right-0 h-full w-2/3 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        } md:hidden z-40`}
      >
        <div className="flex justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">Menu</h2>
          <IoClose
            className="text-3xl cursor-pointer"
            onClick={onHamburgerClick}
          />
        </div>
        <ul className="flex flex-col items-start space-y-4 p-4">
          {categories.map((category) => (
            <li key={category} className="text-lg w-full">
              <NavLink
                to={`/${category}`}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-bold block w-full"
                    : "text-gray-700 hover:text-blue-600 transition duration-300 ease-in-out block w-full"
                }
                onClick={onHamburgerClick}
              >
                {category}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div
        className={`fixed inset-0 bg-black opacity-50 ${
          open ? "block" : "hidden"
        } md:hidden`}
        onClick={onHamburgerClick}
      ></div>
    </nav>
  );
}
