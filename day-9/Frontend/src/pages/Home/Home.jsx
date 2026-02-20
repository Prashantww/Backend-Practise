import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [notes, setNotes] = useState([
    {
      title: "title",
      description: "description!!!!",
    },
    {
      title: "title",
      description: "description!!!!",
    },
  ]);

  // console.log("first");

  function fetchNotes() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNotes(res.data.notes);
    });
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const { title, description } = e.target.elements;

    axios
      .post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        fetchNotes();
      });
  }

  console.log("first");

  return (
    <>
      <main>
        <h1>
          A Place to Save Your Notes
          <br />
          Safely & Securely
        </h1>
        <form className="note-create-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Title" name="title" />
          <div className="line"></div>
          <textarea
            name="description"
            id=""
            placeholder="Write your content here..."
          ></textarea>
          {/* <input type="submit" className="submitButton" value="Save" /> */}
          <button type="submit" className="submitButton">
            Save
          </button>
        </form>
        <div className="allNotes">
          {notes.map((note, index) => {
            return (
              <div className="note" key={index}>
                <h3>{note.title}</h3>
                <p>{note.description}</p>
                <button>
                  <Link to={`notes/${note._id}`}>Open</Link>
                </button>
                <div className="bgBlur"></div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default Home;
