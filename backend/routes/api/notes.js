const express = require("express");

const asyncHandler = require("express-async-handler");


const router = express.Router();

const { Note } = require("../../db/models");

router.get(
  "/",
  asyncHandler(async function (req, res) {
    const notes = await Note.findAll();

    return res.json(notes);
  })
);

router.post("/", asyncHandler(async (req, res) => {
  const { title, content, userId } = req.body

  console.log("------------", req.body)
  const note = await Note.build({ title, content, userId});
  console.log("Note from route", note)
  await note.save();
  res.json(note);
}));
//TO DO: ADD VALIDATIONS TO POST

router.put("/:id(\\d+)", asyncHandler(async (req, res) => {
  const noteId = parseInt(req.params.id, 10);
  const note = await Note.findByPk(noteId);
  
  await note.update(req.body);
  return res.json(note);
}));

router.delete("/:id(\\d+)", asyncHandler(async (req, res) => {
  const noteId = parseInt(req.params.id, 10);
  const note = await Note.findByPk(noteId)

  if (note) {
    await note.destroy()
  }
}))


module.exports = router;
