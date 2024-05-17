const mongoose = require('mongoose');
const { Schema } = mongoose;

const Note = mongoose.model("Note", new Schema({ title: String , id: String, category: String , description: String , date: String , completed: Boolean , }));

module.exports = Note;
