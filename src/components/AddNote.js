import React, {useContext, useState} from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = () => {
    const context = useContext(noteContext);
 const {addnote} = context;

 const [note, setNotes] = useState({title: "", description: "", tag: ""});
const handleclick = (e) => {
     e.preventDefault();
      // note.title = document.getElementById('title');
      // note.description = document.getElementById('desc');
      // note.tag = 'personal';
      console.log(note);
      addnote(note.title, note.description, note.tag);
      setNotes({title: "", description: "", tag: ""})
}

const onChange = (e) => {
   setNotes({...note, [e.target.name]: e.target.value})
}
  return (
    <div>
       <div className="container my-3">
   <h1> Add Note </h1>
   <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange}/>
   </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} required />
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
  </div>
   <button type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
</form>
</div>
    </div>
  )
}

export default AddNote
