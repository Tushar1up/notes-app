const express = require("express");
const router = express.Router();
const User = require("../model/user-model");
const Notes = require("../model/notes-modal");
//middleware
const verifyToken = require("../middleware/auth-middleware");

router
  .route("/dashboard")
  .get(verifyToken, async (req, res) => {
    try {
      const notesdata = await Notes.find();
      res.status(200).json({
        message: "Welcome to the dashboard!",
        user: req.user,
        notesdata,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching notes data", error: error.message });
    }
  })
  .post(async (req, res) => {
    try {
      await Notes.create(req.body);
      res.json({ message: "Note added" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error adding note", error: error.message });
    }
  });

router.route("/dashboard/:id").delete(async (req, res) => {
  try {
    const noteId = req.params.id; // passing the note ID in the URL as a parameter

    const deletedNote = await Notes.findByIdAndDelete(noteId);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully", deletedNote });
  } catch (error) {
    res.status(500).json({ message: "Error deleting note", error });
  }
}).put(async (req, res) => {
  try {
    const noteId = req.params.id; // passing the note ID in the URL as a parameter
    const { heading, content } = req.body; // Get the updated heading and content from the request body

    const updatedNote = await Notes.findByIdAndUpdate(
      noteId,
      { heading, content },
      { new: true } // Return the updated note
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note updated successfully", updatedNote });
  } catch (error) {
    res.status(500).json({ message: "Error updating note", error });
  }
});

module.exports = router;
