const express = require("express");

const app = express();
app.use(express.json());

let notes = [];

app.post("/notes", (req, res) => {
  res.send("note created");
  notes.push(req.body);
});

app.get("/notes", (req, res) => {
  res.send(notes);
});

app.delete("/notes/:index", (req, res) => {
  delete notes[req.params.index];

  res.send("note deleted successfully");
});

app.patch("/notes/:index", (req, res) => {
  notes[req.params.index].discription = req.body.discription;
  res.send("note updated successfully");
});

module.exports = app;
