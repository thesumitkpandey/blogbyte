import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Loader() {
  const currentUser = useSelector((state) => state.user.currentUser);

  if (!currentUser) {
    return <Navigate to="/signin" />;
  }
  return <Navigate to={`u/${currentUser.username}`} />;
}
