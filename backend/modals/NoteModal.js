const mongoose = require("mongoose");
const { Schema } = mongoose;

const NoteSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },

  title: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
    required: true,
  },
  tag: {
    type: "string",
    default: "general",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Note", NoteSchema);
