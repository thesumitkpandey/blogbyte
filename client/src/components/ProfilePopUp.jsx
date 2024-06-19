import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaNewspaper,
  FaCommentAlt,
  FaPenNib,
  FaHistory,
  FaUserCircle,
} from "react-icons/fa";
import { MdLocalLibrary, MdOutlineCancel } from "react-icons/md";
import { useSearchParams } from "react-router-dom";

const menuOptions = [
  { icon: FaPenNib, text: "Write" },
  { icon: FaNewspaper, text: "Posts" },
  { icon: MdLocalLibrary, text: "Library" },
  { icon: FaHistory, text: "History" },
];

export default function Sidebar({
  currentUser,
  setIsProfilePopUpOpen,
  isProfilePopUpOpen,
}) {
  const [tabParams, setTabParams] = useSearchParams();

  function tabClick(e) {
    console.log(e.target.span);
  }

  return (
    <div className="fixed inset-0 w-screen z-50 bg-gray-700 bg-opacity-90 flex justify-center items-center">
      <div className="max-w-md md:w-1/4 h-full bg-gray-700 text-white p-6 flex flex-col items-center rounded-lg overflow-hidden relative">
        <MdOutlineCancel
          onClick={() => setIsProfilePopUpOpen(false)}
          className="text-3xl cursor-pointer absolute top-2 right-2 transition-transform duration-300 hover:scale-125"
        />
        <Link
          to={`/u/${currentUser.userName}`}
          className="w-full flex flex-col items-center mb-8 px-4 py-2 hover:bg-gray-600 rounded transition duration-300 cursor-pointer"
        >
          <div className="relative mb-2">
            <img
              src={currentUser.avatar}
              alt="user image"
              className="rounded-full h-32 w-32 border-4 border-white mb-2"
            />
          </div>
          <h1 className="text-2xl font-merriweather font-bold mb-1">
            {currentUser.name}
          </h1>
          <p className="bg-blue-500 px-2 py-1 rounded-full font-bold text-sm text-white mb-2">
            @{currentUser.userName}
          </p>
          <p className="text-center text-sm px-2">
            This is a demo bio and will be replaced later by the actual dynamic
            bio.
          </p>
        </Link>

        <div className="w-full flex flex-col items-center">
          {menuOptions.map((option, index) => (
            <div
              key={index}
              onClick={tabClick}
              className="w-full flex items-center mb-4 px-4 py-2 cursor-pointer hover:bg-gray-600 rounded transition duration-300"
            >
              <option.icon className="mr-2" />
              <span>{option.text}</span>
            </div>
          ))}
        </div>
        <div className="w-full mb-4">
          <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center cursor-pointer transition duration-300">
            Account
          </div>
        </div>
        <div className="w-full mb-4">
          <div className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-center cursor-pointer transition duration-300">
            Sign Out
          </div>
        </div>
      </div>
    </div>
  );
}
