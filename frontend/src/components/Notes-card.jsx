import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

const NoteCard = ({ id, heading, content, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newHeading, setNewHeading] = useState(heading);
  const [newContent, setNewContent] = useState(content);

  const handleUpdate = () => {
    onUpdate(id, { heading: newHeading, content: newContent });
    setIsEditing(false); // Exit editing mode after saving
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-4 shadow-sm bg-white">
      {isEditing ? (
        <>
          <input
            type="text"
            value={newHeading}
            onChange={(e) => setNewHeading(e.target.value)}
            className="border border-gray-300 rounded w-full p-2 mb-2"
          />
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="border border-gray-300 rounded w-full p-2 mb-2"
            rows="4"
          />
          <div className="flex justify-end space-x-3">
            <button
              onClick={handleUpdate}
              className="px-3 py-2 text-sm text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-white transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-2 text-sm text-gray-500 border border-gray-500 rounded hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-xl font-semibold mb-2">{heading}</h3>
          <p className="text-gray-600 mb-4">{content}</p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center px-3 py-2 text-sm text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-white transition-colors"
            >
              <FaEdit className="mr-2" /> Edit
            </button>
            <button
              onClick={onDelete}
              className="flex items-center px-3 py-2 text-sm text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-white transition-colors"
            >
              <FaTrash className="mr-2" /> Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NoteCard;
