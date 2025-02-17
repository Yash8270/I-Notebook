import React, {useState, useContext, useEffect, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getnote,editnote } = context;
  useEffect(() => {
    getnote();
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNotes] = useState({id: "", etitle: "", edescription: "", etag: ""});

  const updateNote = (currentnote) => {
    ref.current.click();
    setNotes({id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag});
  };

  const handleclick = (e) => {
      //  e.preventDefault();
      editnote(note.id, note.etitle, note.edescription, note.etag);
      refClose.current.click();

  }
  
  const onChange = (e) => {
     setNotes({...note, [e.target.name]: e.target.value});
  }

  return (
    <>
      <AddNote />

<button type="button"  ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
  <div className="mb-3">
    <label htmlFor="etitle" className="form-label">Title</label>
    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange}/>
   </div>
  <div className="mb-3">
    <label htmlFor="edescription" className="form-label">Description</label>
    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} required />
  </div>
  <div className="mb-3">
    <label htmlFor="etag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
  </div>
</form>
      </div>
      <div className="modal-footer">
        <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" onClick={handleclick} className="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>       
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container">
          {notes.length===0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
