import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("added successfully", "success");
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-10 mx-auto">
            <h4>Add a Note</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  placeholder="Enter title for your note"
                  onChange={onchange}
                  value={note.title}
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
                  id="description"
                  name="description"
                  placeholder="Enter description for your note"
                  onChange={onchange}
                  value={note.description}
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
                  id="tag"
                  name="tag"
                  placeholder="Enter tag for your note"
                  onChange={onchange}
                  value={note.tag}
                  required
                />
              </div>
              <div>
                <button
                  disabled={
                    note.title.length === 0 ||
                    note.description.length === 0 ||
                    note.tag.length === 0
                  }
                  type="submit"
                  className="btn btn-primary mb-3"
                >
                  Add a Note
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNote;
