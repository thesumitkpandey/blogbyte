import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import app from "../utils/firebase.js";
import { useDispatch } from "react-redux";
import { signIn, signOut } from "../redux/user/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import uploadOnFirebase from "../utils/uploadOnFirebase.js";
import { displayName } from "react-quill";
export default function Oauth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function handleGoogleClick() {
    const auth = getAuth(app);

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      let googleAuthResponse = await signInWithPopup(auth, provider);

      let response = await axios.post("/api/v1/users/googleAuth", {
        name: googleAuthResponse.user.displayName,
        email: googleAuthResponse.user.email,
        avatar: googleAuthResponse.user.photoURL,
        userName: googleAuthResponse.user.uid,
      });

      response.data.success ? dispatch(signIn(response.data.user)) : "";
      navigate(`/u/${response.data.user.userName}`);
    } catch (err) {
      console.log("Please try again ", err);
    }
  }
  return (
    <button
      className="w-full justify-center items-center bg-blue-500 flex text-white p-2 rounded hover:bg-blue-600 transition duration-200"
      onClick={handleGoogleClick}
    >
      Sign in with &nbsp;
      <FcGoogle className="text-2xl" />
    </button>
  );
}
