const express = require("express");
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

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

router.post("/", csrfProtection, asyncHandler(async (req, res) => {
  const note = await Note.create(req.body);
  res.json(note);
}));
//TO DO: ADD VALIDATIONS TO POST

router.delete("/:id(\\d+)", asyncHandler(async (req, res) => {
  const noteId = parseInt(req.params.id, 10);
  const note = await Note.findByPk(noteId)

  if (note) {
    await note.destroy()
  }
}))


module.exports = router;
