import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import app from "../utils/firebase.js";
export default function Oauth() {
  async function handleGoogleClick() {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      let response = await signInWithPopup(auth, provider);
      console.log(response);
    } catch (err) {
      console.log("Please try again ", err);
    }
  }
  return (
    <button
      className="bg-yellow-950 rounded-xl p-0 flex "
      onClick={handleGoogleClick}
    >
      Sign in with <FcGoogle />
    </button>
  );
}
