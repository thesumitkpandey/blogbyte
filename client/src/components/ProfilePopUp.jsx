import { Link } from "react-router-dom";
export default function ProfilePopUp({ userData }) {
  return (
    <div className="bg-[#f2f2f2] fixed rounded-3xl top-10 right-10 h-80 w-60 z-80 shadow-lg">
      <ul className="h-full w-full flex flex-col justify-around mx-8">
        <Link to={`/u/${userData.userName}`}>
          <li className="cursor-pointer hover:text-blue-500">Profile</li>
        </Link>
        <li className="cursor-pointer hover:text-blue-500">Write</li>
        <li className="cursor-pointer hover:text-blue-500">Activities</li>
        <li className="cursor-pointer hover:text-blue-500">Change Password</li>
        <li className="cursor-pointer hover:text-blue-500">Sign Out</li>
      </ul>
    </div>
  );
}
