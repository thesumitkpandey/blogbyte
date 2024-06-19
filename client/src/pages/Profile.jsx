import { useSearchParams } from "react-router-dom";
import MainProfile from "../components/MainProfile";

import Write from "../components/Write";
import { useSelector } from "react-redux";
import Dashboard from "../components/Dashboard";
export default function Profile() {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="w-full h-full">
      <Dashboard />
    </div>
  );
}
