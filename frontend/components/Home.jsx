
import React, { useState } from "react";
import { FaSearch, FaPaperPlane, FaSmile, FaBars } from "react-icons/fa";
import { IoMdAttach } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";

function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-200 ">
      {/* Sidebar (Collapsible for small screens) */}
      <div
        className={`absolute md:relative ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } transition-transform w-64 bg-white border-r border-gray-300 flex flex-col md:w-1/4 lg:w-1/5 z-10`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
          <div className="w-10 h-10 bg-green-500 rounded-full"></div>
          <button onClick={()=>setSidebarOpen(false)}><IoIosClose className="text-gray-600 cursor-pointer md:hidden text-2xl" /></button>
        </div>

        {/* Search Bar */}
        <div className="p-2">
          <div className="flex items-center bg-gray-100 p-2 rounded-lg">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search or start new chat"
              className="bg-transparent w-full outline-none text-sm"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="flex items-center p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-200"
            >
              <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
              <div className="ml-3 flex-1">
                <h3 className="text-gray-800 font-semibold">Contact {i + 1}</h3>
                <p className="text-gray-500 text-sm">Last message...</p>
              </div>
              <span className="text-xs text-gray-400">10:30 AM</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 bg-white border-b border-gray-300">
          <div className="flex items-center">
            {/* Menu Button (Visible on small screens) */}
            <button
              className="md:hidden text-gray-600 mr-3"
              onClick={() => setSidebarOpen(true)}
            >
              <FaBars size={20} />
            </button>
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div className="ml-3">
              <h3 className="text-gray-800 font-semibold">Contact Name</h3>
              <p className="text-gray-500 text-sm">Online</p>
            </div>
          </div>
          <BsThreeDotsVertical className="text-gray-600 cursor-pointer" />
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
          <div className="mb-3 flex justify-start">
            <div className="bg-white p-3 rounded-lg shadow max-w-xs">
              Hello! How are you?
            </div>
          </div>
          <div className="mb-3 flex justify-end">
            <div className="bg-green-500 text-white p-3 rounded-lg shadow max-w-xs">
              I'm good, what about you?
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="flex items-center p-3 bg-white border-t border-gray-300">
          <button className="text-gray-500 px-3">
            <IoMdAttach size={20} />
          </button>
          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 border rounded-full px-4 py-2 outline-none text-sm"
          />
         
          <button className="bg-green-500 text-white p-2 rounded-full ml-2">
            <FaPaperPlane size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;