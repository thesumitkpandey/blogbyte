import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import categories from "../utils/categories";
import Auth from "./Auth";
import logo from "../assets/logo.png";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  //#5340ff main color
  function popUp() {
    setIsOpen(!isOpen);
  }
  function popUpClose() {
    setIsOpen(!isOpen);
  }
  return (
    <>
      <div className="h-12 flex  bg-white justify-between  shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="rounded-xl overflow-hidden">
          <Link to="/">
            <img className="w-full h-full object-cover" src={logo} />
          </Link>
        </div>
        <div className="">
          {categories.map((value) => (
            <div key={value} className="">
              <NavLink
                to={`/${value}`}
                className={({ isActive }) => (isActive ? "" : "undefined")}
                end
              >
                {value}
              </NavLink>
            </div>
          ))}
        </div>
        <div className="">
          <button onClick={popUp}>Sign In</button>
        </div>
      </div>
      <Auth isOpen={isOpen} popUpClose={popUpClose} />
    </>
  );
}
