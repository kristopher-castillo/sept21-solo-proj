const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const notesRouter = require("./notes.js");
const notebooksRouter = require("./notebooks.js")

const { Note, Notebook, User } = require("../../db/models");

router.use("/session", sessionRouter);

router.use("/users", usersRouter);
router.use("/notes", notesRouter);
router.use("/notebooks", notebooksRouter);

router.get('/', asyncHandler(async function (req, res) {
  const notes = await Note.findAll({
    order: [['createdAt', 'DESC']],
    include: [User],
    limit: 4
  })
  const notebooks = await Notebook.findAll({
    order: [['createdAt', 'DESC']],
    include: [User],
    limit: 4
  })

  return res.json({
    notes,
    notebooks
  });
}))



module.exports = router;
