import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Note from "./pages/Note/Note";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/notes/:id" element={<Note />} />
    </Routes>
  );
};

export default App;
