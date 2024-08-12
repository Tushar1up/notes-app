const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
    heading: {
        type: String, 
        required: true
    },
    content: {
        type: String, 
        required: true
    },
});

const Note = mongoose.model("Note", notesSchema);

module.exports = Note;
