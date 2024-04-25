import { NavLink } from "react-router-dom";
import { ImSearch } from "react-icons/im";
import logo from "../assets/logo.png";
import classes from "../css/Navbar.module.css";
export default function Navbar() {
  return (
    <div className={classes.navbar}>
      <div className={classes.navbarLeft}>
        <h1>blogbyte</h1>
      </div>
      <div className={classes.navbarMid}>
        <div className="navbarMidItems">
          <NavLink
            to="technology"
            className={({ isActive }) =>
              isActive ? "classes.active" : undefined
            }
            end
          >
            Technology
          </NavLink>
        </div>
        <div className="navbarMidItems">
          <NavLink
            to="business"
            className={({ isActive }) =>
              isActive ? "classes.active" : undefined
            }
            end
          >
            Business
          </NavLink>
        </div>
        <div className="navbarMidItems">
          <NavLink
            to="environment"
            className={({ isActive }) =>
              isActive ? "classes.active" : undefined
            }
            end
          >
            Environment
          </NavLink>
        </div>
        <div className="navbarMidItems">
          <NavLink
            to="politics"
            className={({ isActive }) =>
              isActive ? "classes.active" : undefined
            }
            end
          >
            Politics
          </NavLink>
        </div>
        <div className="navbarMidItems">
          <NavLink
            to="entertainment"
            className={({ isActive }) =>
              isActive ? "classes.active" : undefined
            }
            end
          >
            entertaiment
          </NavLink>
        </div>
        <div className="navbarMidItems">
          <NavLink
            to="sports"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            end
          >
            Sports
          </NavLink>
        </div>
      </div>
      <div className={classes.navbarRight}>
        <ImSearch />
        <button className={classes.signIn}>
          <NavLink
            to="/signin"
            className={({ isActive }) =>
              isActive ? classes.btnActive : undefined
            }
            end
          >
            SignIn
          </NavLink>
        </button>
      </div>
    </div>
  );
}
