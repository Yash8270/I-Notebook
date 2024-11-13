const express = require('express');
const router = express.Router();    
var fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require("express-validator");
const Note = require('../models/Notebook');
const user = require('../models/User');

router.get("/fetchallnotes", fetchuser, async (req,res) => {
      const notes = await Note.find({user: req.user.id});
      res.json(notes);
})

router.post("/addnotes", fetchuser, [
    body("title").isLength({min: 3}),
    body("description").isLength({ min: 3 }),
  ], async (req,res) => {
    try {
    const {title, description, tag} = req.body;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.send({ errors: result.array() });
    }
    
    const note = new Note(
      {
        title, description, tag, user: req.user.id
          
      })

    const savenote = await note.save();
    res.json(savenote);  
    } catch(error) {
      console.log(error.message);
      res.status(500).send("Internal server errror");
    } 

})


router.put('/updatenote/:id', fetchuser,[
  body("title").isLength({min: 3}),
  body("description").isLength({ min: 3 }),
], async (req,res) => {
  const {title, description, tag} = req.body;
  const newnote = {};
  if(title) {
    newnote.title = title;
  }
  if(description) {
    newnote.description = description;
  }
  if(tag) {
    newnote.tag = tag;
  }

  let note = await Note.findById(req.params.id);
  if(!note) {
    return res.status(404).send("Not found");
  }

  if(note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
  }

  note = await Note.findByIdAndUpdate(req.params.id, {$set: newnote},{new:true});
  res.json({note});
  console.log(note);
})

router.delete('/deletenote/:id', fetchuser, async (req,res) => {
  
  let note = await Note.findById(req.params.id);
  if(!note) {
    return res.status(404).send("Not found");
  }

  if(note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
  }

  note = await Note.findByIdAndDelete(req.params.id);
  res.json({"Success": "the note has been deleted", note: note})
})

module.exports = router;