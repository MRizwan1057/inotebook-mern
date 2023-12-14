import React, { useState } from "react";
import NoteContext from "./noteContext";
import axios from "axios";

const NoteState = (props) => {
  // const host = "http://localhost:4000";
  // const noteInitial = [];
  const [notes, setNotes] = useState([""]);
  //  Add a note
  const getAllNotes = async () => {
    const url = "http://localhost:4000/api/notes/getallnotes";
    const headers = {
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    };
    try {
      let { data } = await axios.get(url, headers);
      setNotes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addNote = async (title, description, tag) => {
    const notesData = {
      title,
      description,
      tag,
    };
    const headers = {
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    };

    const url = "http://localhost:4000/api/notes/addnote";
    try {
      let { data } = await axios.post(url, notesData, headers);
      let newnote = await data;
      setNotes(notes.concat(newnote));
      // getAllNotes();
    } catch (error) {
      console.error(error);
    }
  };
  //delete a note
  const deleteNote = async (id) => {
    const url = `http://localhost:4000/api/notes/deletenote/${id}`;
    try {
      let { data } = await axios.delete(url, {
        headers: {
          "content-type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      setNotes(data);
    } catch (error) {
      console.error(error);
    }
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //edit a note
  const editNote = async (id, title, description, tag) => {
    // api call to edit a note
    const notesData = {
      title,
      description,
      tag,
    };
    const headers = {
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    };

    const url = `http://localhost:4000/api/notes/updatenote/${id}`;
    try {
      const { data } = await axios.put(url, notesData, headers);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    // let updated = JSON.parse(JSON.stringify(newnotes));
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        notes[index].title = title;
        notes[index].description = description;
        notes[index].tag = tag;
        break;
      }
    }
    getAllNotes();
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, getAllNotes, deleteNote, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
