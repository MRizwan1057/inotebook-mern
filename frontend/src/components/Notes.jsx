import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = (props) => {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getAllNotes, editNote } = context;
  const [cuser, setCuser] = useState();

  useEffect(() => {
    if (localStorage.getItem("token", "cuser")) {
      getAllNotes();
      const items = JSON.parse(localStorage.getItem("cuser"));
      if (items) {
        setCuser(items);
      }
    } else {
      navigate("/login");
    }

    // eslint-disable-next-line
  }, []);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const ref = useRef(null);
  const refClose = useRef(null);

  const updatenote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("updating note..." + note);
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("updated successfully", "success");
  };

  return (
    <>
      <div className="container">
        <AddNote showAlert={props.showAlert} />

        <button
          ref={ref}
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Launch demo modal
        </button>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Edit Note
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      placeholder="Enter title for your note"
                      onChange={onchange}
                      value={note.etitle}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="edescription"
                      name="edescription"
                      placeholder="Enter description for your note"
                      onChange={onchange}
                      value={note.edescription}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tag" className="form-label">
                      Tag
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etag"
                      name="etag"
                      placeholder="Enter tag for your note"
                      onChange={onchange}
                      value={note.etag}
                      required
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  ref={refClose}
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  disabled={
                    note.etitle.length === 0 ||
                    note.edescription.length === 0 ||
                    note.etag.length === 0
                  }
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <h4 className="p-3">
            {notes.length === 0
              ? `no notes to display`
              : `Hi ${cuser} , Your Notes...`}
          </h4>

          {notes.map((note, ind) => {
            return (
              <NoteItem
                key={ind}
                note={note}
                updatenote={updatenote}
                showAlert={props.showAlert}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
