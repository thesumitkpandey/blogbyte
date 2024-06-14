import { useSearchParams } from "react-router-dom";
import MainProfile from "../components/MainProfile";
import Sidebar from "../components/Sidebar";
import Write from "../components/Write";
import { useSelector } from "react-redux";
export default function Profile() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [tab] = useSearchParams();
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar currentUser={currentUser} />
      {tab.get("tab") && <Write />}
    </div>
  );
}
