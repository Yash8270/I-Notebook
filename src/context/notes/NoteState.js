import React, { useState } from 'react';
import noteContext from './noteContext';

const NoteState = (props) => {
    const host  = "http://localhost:5000";
    const notesInitial = [ ]

   const [notes, setNotes] = useState(notesInitial);
   
  //Get Note

   const getnote = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
            'Content-type':'application/json',
            'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2ZWFjM2IzNDljYTYzMjJjMTU2NWJkIn0sImlhdCI6MTcxODUyOTA4M30.K6S4zzPyFezy-dzmPFWRGqbLM0kzRlv2tSOksXDUXeg'
        },
    })
     const json = await response.json();
    //  console.log(json);
     setNotes(json);

   }

   //Add Note

   const addnote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
        method: 'POST',
        headers: {
            'Content-type':'application/json',
            'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2ZWFjM2IzNDljYTYzMjJjMTU2NWJkIn0sImlhdCI6MTcxODUyOTA4M30.K6S4zzPyFezy-dzmPFWRGqbLM0kzRlv2tSOksXDUXeg'
        },
        body: JSON.stringify({title, description, tag})
    })
   
    const json = await response.json();
    console.log(json);
      setNotes(notes.concat(json));
   }

   //Delete Note

   const deletenote = async (id) => {

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type':'application/json',
            'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2ZWFjM2IzNDljYTYzMjJjMTU2NWJkIn0sImlhdCI6MTcxODUyOTA4M30.K6S4zzPyFezy-dzmPFWRGqbLM0kzRlv2tSOksXDUXeg'
        },
    })

     console.log("Deleted successfully"+ id);
    const newNote = notes.filter((note) => {return note._id !== id});
    setNotes(newNote);
   }

   //Edit Note

   const editnote = async (id, title, description, tag) => {

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
            'Content-type':'application/json',
            'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2ZWFjM2IzNDljYTYzMjJjMTU2NWJkIn0sImlhdCI6MTcxODUyOTA4M30.K6S4zzPyFezy-dzmPFWRGqbLM0kzRlv2tSOksXDUXeg'
        },
        body: JSON.stringify({title, description, tag})
    });

    const json = await response.json();
    console.log(json);
    const newNotes = JSON.parse(JSON.stringify(notes));
    // console.log(newNotes);
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    console.log(newNotes);
    setNotes(newNotes);
   }


    
    return (
        <noteContext.Provider value={{notes, addnote, deletenote, editnote, getnote}}>
            {props.children}
        </noteContext.Provider>
    )

}

export default NoteState;