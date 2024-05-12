import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import categories from "../utils/categories";
import Auth from "./Auth";
import logo from "../assets/logo.jpg";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  function popUp() {
    setIsOpen(!isOpen);
  }
  function popUpClose() {
    setIsOpen(!isOpen);
  }
  return (
    <>
      <div className="h-12 flex  bg-slate-600 md:justify-between ">
        <div className="">
          <img className="w-40 h-12" src={logo} />
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
