const express = require("express");

const port = 3000;

const app = express();
app.use(express.json());

let notes = [];

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/notes", (req, res) => {
  console.log(req.body);
  notes.push(req.body);
  res.send("note created");
});

app.get("/notes", (req, res) => {
  res.send(notes);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
