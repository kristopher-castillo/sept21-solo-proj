const express = require("express");

const asyncHandler = require("express-async-handler");

const router = express.Router();

const { Notebook } = require("../../db/models");

router.get(
  "/",
  asyncHandler(async function (req, res) {
    const notebooks = await Notebook.findAll();

    return res.json(notebooks);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { title, userId } = req.body;

    const notebook = await Notebook.build({ title, userId });
    await notebook.save();
    res.json(notebook);
  })
);
//TO DO: ADD VALIDATIONS TO POST

router.put(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const notebookId = parseInt(req.params.id, 10);
    const notebook = await Notebook.findByPk(notebookId);

    await notebook.update(req.body);
    return res.json(notebook);
  })
);

router.delete(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const notebookId = parseInt(req.params.id, 10);
    const notebook = await Notebook.findByPk(notebookId);

    if (notebook) {
      await notebook.destroy();
      const newNotebooks = await Notebook.findAll();
      return res.json(newNotebooks);
    }
  })
);

module.exports = router;
