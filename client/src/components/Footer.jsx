import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <div className="w-screen h-40  bg-[#f2f2f2] relative">
      <div className="justify-between flex h-12 px-6">
        <div className="">
          <img src={logo} className="rounded-sm h-12" />
        </div>
        <div className="flex gap-6">
          <Link className="text-2xl">Contact</Link>
          <Link className="text-2xl">Made by</Link>
        </div>
      </div>
      <div className="flex w-full  justify-center  gap-10 text-3xl md:gap-20 ">
        <a href="https://github.com/thesumitkpandey">
          <FaGithub />
        </a>
        <a href="https://in.linkedin.com/in/thesumitkpandey">
          <FaLinkedin />
        </a>
        <a href="https://www.facebook.com/">
          <FaFacebookSquare />
        </a>
        <a href="https://t.me/thesumitkpandey">
          <FaTelegram />
        </a>
        <a>
          <FaSquareXTwitter />
        </a>
      </div>
      <div className="bg-black h-5 w-screen absolute bottom-0 flex justify-center items-center p-2 text-white">
        Made with &nbsp; <FaHeart className="text-red-700" />
        &nbsp; by &nbsp;<Link to="https://sumitkpandey.com">SumitKPandey</Link>
      </div>
    </div>
  );
}
