const express = require("express");
const noteModel = require("./models/notes.model");

const app = express();

app.use(express.json());

const notes = [];

// Post

app.post("/notes", async (req, res) => {
  const { title, discription } = req.body;

  const note = await noteModel.create({
    title,
    discription,
  });

  res.status(201).json({
    message: "Note Created Successfully",
    note,
  });
});

// Get

app.get("/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.status(200).json({
    message: "Note fetched Successfully",
    notes,
  });
});

module.exports = app;
