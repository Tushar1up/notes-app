import React, { useState } from "react";
import { useAuth } from "../utils/auth";
import axios from "axios";

const Header = ({ username, onSearch }) => {
  const { LogoutUser } = useAuth();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [heading, setheading] = useState("");
  const [content, setcontent] = useState("");

  const onLogout = () => {
    LogoutUser(); //function made in  auth.jsx file , destructed from use auth();
  };

  const handleAddNote = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setheading("");
    setcontent("");
  };

  const handleSaveNote = () => {
    console.log("Note Saved:", { heading, content });
    // Add your logic to save the note here
    axios
      .post("https://notes-app-66cg.onrender.com/Dashboard", {
        heading,
        content,
      })
      .then((response) => {
        console.log(response); 
      });
    handleClosePopup();
    // Refresh the page to see the updated notes
    window.location.reload();
  };

  return (
    <header className="relative flex justify-between items-center p-4 bg-gray-100 shadow-md">
      <div className="text-lg font-bold">Welcome, {username}!</div>
      <input
        type="text"
        placeholder="Search notes..."
        onChange={(e) => onSearch(e.target.value)}
        className="flex-grow mx-4 p-2 border border-gray-300 rounded-md"
      />
      <div className="flex gap-2">
        <button
          onClick={handleAddNote}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        >
          Add Note
        </button>
        <button
          onClick={onLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Popup for Adding a Note */}
      {isPopupOpen && (
        <div className="absolute top-16 right-4 w-80 p-4 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <h2 className="text-lg font-bold mb-2">Add New Note</h2>
          <input
            type="text"
            placeholder="Note Header"
            value={heading}
            onChange={(e) => setheading(e.target.value)}
            className="w-full mb-2 p-2 border border-gray-300 rounded-md"
          />
          <textarea
            placeholder="Note Content"
            value={content}
            onChange={(e) => setcontent(e.target.value)}
            className="w-full mb-2 p-2 border border-gray-300 rounded-md"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={handleClosePopup}
              className="px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveNote}
              className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
