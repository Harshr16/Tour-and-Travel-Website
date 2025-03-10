import React from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../appwrite/appwrite";

export default function ClientNavbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await account.deleteSession("current");
    navigate("/");
  };

  return (
    <div className="fixed w-full z-50 bg-gray-900 text-white shadow-md">
      <div className="flex items-center justify-between px-8 py-4">
        <h1 className="text-2xl font-bold">
          <span className="text-orange-500">My</span>Tour - Client
        </h1>
        <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white py-2 px-6 rounded-full text-lg font-semibold shadow-md hover:bg-red-700 transition duration-300"
            >
              Logout
            </button>
      </div>
    </div>
  );
}
