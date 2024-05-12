import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <div className="bg-[red] h-28">
      <div>
        <ul className="flex justify-center md:justify-end">
          <img src={logo} alt="logo" className="hidden md:block " />
          <li className="mr-8">
            <Link to="https://www.facebook.com">
              <FaFacebook size={30} />
            </Link>
          </li>
          <li className="mr-8">
            <Link to="https://www.twitter.com">
              <FaTwitter size={30} />
            </Link>
          </li>
          <li className="mr-8">
            <Link to="https://www.instagram.com">
              <FaInstagram size={30} />
            </Link>
          </li>
          <li className="mr-8">
            <Link to="https://www.youtube.com">
              <FaYoutube size={30} />
            </Link>
          </li>
          <li className="mr-8">
            <Link to="https://www.linkedin.com">
              <FaLinkedin size={30} />
            </Link>
          </li>
          <li className="mr-8">
            <Link to="https://api.whatsapp.com">
              <FaWhatsapp size={30} />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
