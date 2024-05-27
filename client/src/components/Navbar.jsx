import { Link, NavLink } from "react-router-dom";
import { FcSearch } from "react-icons/fc";
import { IoMenu } from "react-icons/io5";
import categories from "../utils/categories";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdDarkMode } from "react-icons/md";
import ProfilePopUp from "./ProfilePopUp";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isProfilePopUpOpen, setIsProfilePopUpOpen] = useState(false);
  function darkModeClick() {}
  function onHamburgerClick() {
    setOpen(!open);
  }

  const currentUser = useSelector((state) => state.user.currentUser);
  const darkMode = useSelector((state) => state.theme.darkMode);
  console.log(currentUser);
  return (
    <nav
      className={`bg-white p-6 h-10  text-black font-merriweather text-[18px] sticky shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px] w-screen flex justify-between items-center`}
    >
      <Link to="/">
        <div className="h1">logo</div>
      </Link>
      <ul
        className={`flex md:flex space-x-12 flex-col bg-black md:bg-white md:h-10  h-screen md:flex-row ${
          open ? "block" : "hidden"
        } items-center`}
      >
        {categories.map((category) => (
          <li key={category} className="h-full w-full text-2xl">
            <NavLink
              to={`/${category}`}
              className={({ isActive }) =>
                isActive
                  ? "rounded-m min-h-12 bg-[rgb(59,130,246)] text-white "
                  : ""
              }
            >
              {category}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="flex space-x-4 justify-between items-center">
        <FcSearch className=" text-2xl" />
        <MdDarkMode onClick={darkModeClick} className=" text-2xl" />
        {currentUser ? (
          <button onClick={() => setIsProfilePopUpOpen(!isProfilePopUpOpen)}>
            hi, {currentUser.name}
          </button>
        ) : (
          <Link to="/signin">
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded transform hover:scale-110 transition duration-300 ease-in-out">
              Sign in
            </button>
          </Link>
        )}
        {!isProfilePopUpOpen ? null : <ProfilePopUp userData={currentUser} />}
        <IoMenu className="md:hidden" onClick={onHamburgerClick} />
      </div>
    </nav>
  );
}
