import {
  FaGithub,
  FaLinkedin,
  FaFacebookSquare,
  FaTelegram,
  FaTwitter,
} from "react-icons/fa";

import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
const socialIcons = [
  {
    name: "github",
    element: <FaGithub />,
    to: "https://github.com/thesumitkpandey",
  },
  {
    name: "linkedin",
    element: <FaLinkedin />,
    to: "https://in.linkedin.com/in/thesumitkpandey",
  },
  {
    name: "facebook",
    element: <FaFacebookSquare />,
    to: "https://www.facebook.com/",
  },
  {
    name: "telegram",
    element: <FaTelegram />,
    to: "https://t.me/thesumitkpandey",
  },
  {
    name: "twitter",
    element: <FaTwitter />,
    to: "https://twitter.com/",
  },
];
export default function Footer() {
  return (
    <footer className="bg-gray-200 py-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="h-12" />
        </div>
        <nav className="flex space-x-6 mt-4 md:mt-0 text-2xl">
          <Link to="/contact" className="text-gray-800 hover:text-blue-500">
            Contact
          </Link>
          <Link to="/about" className="text-gray-800 hover:text-blue-500">
            About Us
          </Link>
          <Link to="/services" className="text-gray-800 hover:text-blue-500">
            Services
          </Link>
        </nav>
        <div className="flex space-x-4 text-2xl">
          {socialIcons.map((el) => (
            <a
              key={el.name}
              href={el.to}
              className="text-gray-800 hover:text-blue-500"
            >
              {el.element}
            </a>
          ))}
        </div>
      </div>
      <div className="text-center mt-8 text-gray-600">
        <p>
          Made with <span className="text-red-600">&hearts;</span> by{" "}
          <a
            href="https://sumitkpandey.com"
            className="text-blue-600 hover:underline"
          >
            SumitKPandey
          </a>
        </p>
      </div>
    </footer>
  );
}
