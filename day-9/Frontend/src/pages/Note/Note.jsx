import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Note.module.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Note = () => {
  const [note, setNote] = useState({
    title: " Dummy Title",
    description: "Dummy Description",
  });
  const [currentDescription, setCurrentDescription] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();

  function handleDelete(id) {
    axios.delete(`http://localhost:3000/api/notes/${id}`).then((res) => {
      console.log(res.data);
      navigate("/");
    });
  }

  function handleSave(id) {
    axios
      .patch(`http://localhost:3000/api/notes/${id}`, {
        description: currentDescription,
      })
      .then(() => {
        // console.log(id, currentDescription);
        navigate("/");
      });
  }

  function fetchNote() {
    axios.get(`http://localhost:3000/api/notes/${id}`).then((res) => {
      setNote(res.data.note);
    });
  }

  useEffect(() => {
    fetchNote();
  }, []);

  useEffect(() => {
    if (note.description) {
      setCurrentDescription(note.description);
    }
  }, [note]);

  // console.log("hi");

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{note.title}</h1>
      <div className={styles.buttonContainer}>
        <button
          className={styles.deleteButton}
          onClick={() => {
            handleDelete(note._id);
          }}
        >
          Delete
        </button>
        <button
          className={`${styles.deleteButton} ${styles.saveButton}`}
          onClick={() => {
            handleSave(note._id);
          }}
        >
          Save
        </button>
        <button
          className={styles.deleteButton}
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </button>
      </div>
      <div className={styles.line}></div>
      <textarea
        className={styles.description}
        name="description"
        value={currentDescription}
        onChange={(e) => {
          setCurrentDescription(e.target.value);
        }}
      />
    </div>
  );
};

export default Note;
