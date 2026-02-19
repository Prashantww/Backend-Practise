const express = require("express");
const noteModel = require("./models/notes.model");

const app = express();

app.use(express.json());

// Post api

app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;

  const note = await noteModel.create({
    title,
    description,
  });

  res.status(201).json({
    message: "Note Created Successfully",
    note,
  });
});

// Get api

app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find();
  res.status(200).json({
    message: "Notes Fetched Successfully",
    notes,
  });
});

// Delete api

app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;

  await noteModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "note deleted Successfully",
  });
});

// Patch api

app.patch("/api/notes/:id", async (req, res) => {
  const id = req.params.id;

  const { description } = req.body;
  await noteModel.findByIdAndUpdate(id, { description });

  res.status(200).json({
    message: "Note updated Successfully",
  });
});

module.exports = app;
