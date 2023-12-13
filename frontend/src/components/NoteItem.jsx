import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updatenote } = props;
  return (
    <>
      <div className="col-md-3">
        <div className="card my-3 py-3">
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            <span className="card-text ctag">{note.tag}</span>
          </div>
          <div className="edits d-flex align-items-center justify-content-center gap-3">
            <span>
              <AiFillDelete
                onClick={() => {
                  deleteNote(note._id);
                  props.showAlert("deleted successfully", "success");
                }}
              />
            </span>
            <span>
              <AiTwotoneEdit
                onClick={() => {
                  updatenote(note);
                }}
              />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
