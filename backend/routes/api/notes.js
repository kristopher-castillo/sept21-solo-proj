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


module.exports = router;
