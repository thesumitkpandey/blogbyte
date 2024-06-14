import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { signIn, signOut } from "../redux/user/userSlice";
export default function ProfilePopUp({ userData }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function userSignOut() {
    navigate("/");
    dispatch(signOut());
    await axios.get("/api/v1/users/signout");
  }
  if (!userData) {
    return null;
  }
  return (
    <div className="bg-[#f2f2f2] fixed rounded-3xl top-10 right-10 h-80 w-60  z-80 shadow-lg">
      <ul className="h-full w-full flex flex-col justify-around mx-8">
        <Link to={`/u/${userData.userName}`}>
          <li className="cursor-pointer hover:text-blue-500">Profile</li>
        </Link>
        <Link to={`/u/${userData.userName}?tab=write`}>
          <li className="cursor-pointer hover:text-blue-500">Write</li>
        </Link>
        <Link to={`/u/${userData.userName}?tab=library`}>
          <li className="cursor-pointer hover:text-blue-500">Library</li>
        </Link>
        <Link to={`/u/${userData.userName}?tab=updateprofile`}>
          <li className="cursor-pointer hover:text-blue-500">Update Profile</li>
        </Link>
        <li
          className="cursor-pointer hover:text-blue-500"
          onClick={userSignOut}
        >
          Sign Out
        </li>
      </ul>
    </div>
  );
}
