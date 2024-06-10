import { Link } from "react-router-dom";
import gw from "../assets/gw.jpg";
export default function Homepage() {
  return (
    <div className="h-screen w-screen bg-green-400 my-4 p-0 md:p-8">
      <div className="m-1/2">
        <img src={gw} />
        <h1>Save our planet</h1>
      </div>
    </div>
  );
}
