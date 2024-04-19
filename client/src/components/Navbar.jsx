import { NavLink } from "react-router-dom"
import { ImSearch } from "react-icons/im"
import logo from "../assets/logo.png"
export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={logo} />
      </div>
      <div className="navbar-mid">
        <NavLink to="technology" className={({ isActive }) => isActive ? "active" : undefined} end>Technology</NavLink>
        <NavLink to="business" className={({ isActive }) => isActive ? "active" : undefined} end>Business</NavLink>
        <NavLink to="environment" className={({ isActive }) => isActive ? "active" : undefined} end>Environment</NavLink>
        <NavLink to="politics" className={({ isActive }) => isActive ? "active" : undefined} end>Politics</NavLink>
        <NavLink to="entertainment" className={({ isActive }) => isActive ? "active" : undefined} end>entertaiment</NavLink>
        <NavLink to="sports" className={({ isActive }) => isActive ? "active" : undefined} end>Sports</NavLink>
      </div>
      <div className="navbar-right">
        <ImSearch />
        <NavLink to="/signin" className={({ isActive }) => isActive ? "active" : undefined} end>SignIn</NavLink>
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : undefined} end>Home</NavLink>
      </div>
    </div>
  )
}
