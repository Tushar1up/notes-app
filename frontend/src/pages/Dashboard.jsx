import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/auth";
import Header from "../components/Header";
import NoteCard from "../components/Notes-card";

function Dashboard() {
  const { Token } = useAuth();
  const [name, setName] = useState("");
  const [notesData, setNotesData] = useState([]); // Initialize as an empty array
  const [filteredNotes, setFilteredNotes] = useState([]); // Add state for filtered notes

  useEffect(() => {
    axios
      .get("http://localhost:3000/Dashboard", {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((response) => {
        console.log(response.data); // Access the response data
        setName(response.data.user.name);
        setNotesData(response.data.notesdata);
        setFilteredNotes(response.data.notesdata); // Initialize filtered notes
        console.log(response.data.notesdata); // Log the notes data from the response
      })
      .catch((error) => {
        console.error("Error fetching dashboard:", error);
      });
  }, [Token]); // Optional: Include `Token` in the dependency array

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/dashboard/${id}`
      );
      if (response.status === 200) {
        console.log("Note deleted successfully");
        setNotesData(notesData.filter((note) => note._id !== id));
        setFilteredNotes(filteredNotes.filter((note) => note._id !== id)); // Update filtered notes
      }
    } catch (error) {
      console.error("Error deleting the note:", error);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/dashboard/${id}`,
        updatedData
      );
      if (response.status === 200) {
        console.log("Note updated successfully");
        setNotesData(
          notesData.map((note) =>
            note._id === id ? response.data.updatedNote : note
          )
        );
        setFilteredNotes(
          filteredNotes.map((note) =>
            note._id === id ? response.data.updatedNote : note
          )
        ); // Update filtered notes
      }
    } catch (error) {
      console.error("Error updating the note:", error);
    }
  };

  // Define the onSearch function
  const onSearch = (searchTerm) => {
    if (searchTerm) {
      const filtered = notesData.filter(
        (note) =>
          note.heading.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredNotes(filtered);
    } else {
      setFilteredNotes(notesData); // Reset to all notes if the search term is empty
    }
  };

  return (
    <>
      <Header username={name} onSearch={onSearch} />{" "}
      {/* Pass onSearch to Header */}
      {filteredNotes.map(
        (
          note // Use filteredNotes instead of notesData
        ) => (
          <NoteCard
            key={note._id}
            id={note._id} // Pass the note ID
            heading={note.heading}
            content={note.content}
            onDelete={() => handleDelete(note._id)}
            onUpdate={handleUpdate} // Pass the handleUpdate function
          />
        )
      )}
    </>
  );
}

export default Dashboard;
