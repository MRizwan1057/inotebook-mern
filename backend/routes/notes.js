const express = require("express");
const router = express.Router();
const Note = require("../modals/NoteModal");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");

// get all notes from the user
router.get("/getallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.status(200).json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Internal Server Error");
  }
});

// add not login required
router.post("/addnote", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    const note = new Note({ title, description, tag, user: req.user.id });
    const savedNote = await note.save();
    res.status(200).json(savedNote);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Internal Server Error");
  }
});

// update not login required
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (title) {
      newNote.description = description;
    }
    if (title) {
      newNote.tag = tag;
    }
    // find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("not Allowed");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.status(200).send(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Internal Server Error");
  }
});

// delete not login required
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    // find the note to be deleted  and delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("not Allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.status(200).send("Not has been deleted");
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Internal Server Error");
  }
});
module.exports = router;
