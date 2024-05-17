import { Link, NavLink } from "react-router-dom";
import { FcSearch } from "react-icons/fc";
import { IoMenu } from "react-icons/io5";
import categories from "../utils/categories";
import { useState } from "react";
import { MdDarkMode } from "react-icons/md";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  function onHamburgerClick() {
    setOpen(!open);
  }
  return (
    <nav
      className={`bg-white p-6 h-10 fixed shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px] w-screen flex justify-between items-center`}
    >
      <Link to="/">
        <div className="h1">logo</div>
      </Link>
      <ul
        className={`flex md:flex space-x-12 flex-col md:flex-row ${
          open ? "block" : "hidden"
        } items-center`}
      >
        {categories.map((category) => (
          <li key={category}>
            <NavLink
              to={`/${category}`}
              className={({ isActive }) => (isActive ? "underline " : "")}
            >
              {category}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="flex space-x-4 justify-between items-center">
        <FcSearch className=" text-2xl" />
        <MdDarkMode className=" text-2xl" />
        <Link to="/signin">
          <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded transform hover:scale-110 transition duration-300 ease-in-out">
            Sign up
          </button>
        </Link>
        <IoMenu className="md:hidden" onClick={onHamburgerClick} />
      </div>
    </nav>
  );
}
