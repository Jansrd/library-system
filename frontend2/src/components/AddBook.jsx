import React, { useState } from "react";
import axios from "axios";
import "../style/addBook.css";

const AddBook = ({ onBookAdded }) => {
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    published_day: "",
  });

  const addBook = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/books/",
        newBook
      );
      onBookAdded(response.data);
      setNewBook({ title: "", author: "", published_day: "" });
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <form className="add-book">
      <div className="add-book-content">
        <div className="add-book-content-left">
          <h2>Add New Book</h2>
        </div>
        <div className="add-book-content-right">
          <div className="add-book-content-right-top">
            <div className="add-book-content-right-input">
              <label className="add-book-label">TITLE</label>
              <input
                className="add-book-input"
                type="text"
                value={newBook.title}
                onChange={(e) =>
                  setNewBook({ ...newBook, title: e.target.value })
                }
                placeholder="Title"
                required
              />
            </div>
            <div className="add-book-content-right-input">
              <label className="add-book-label">AUTHOR</label>
              <input
                className="add-book-input"
                type="text"
                value={newBook.author}
                onChange={(e) =>
                  setNewBook({ ...newBook, author: e.target.value })
                }
                placeholder="Author"
                required
              />
            </div>
          </div>
          <div className="add-book-content-right-bottom">
            <div className="add-book-content-right-input">
              <label className="add-book-label">PUBLISHED DATE </label>
              <input
                className="add-book-input"
                type="date"
                value={newBook.published_day}
                onChange={(e) =>
                  setNewBook({ ...newBook, published_day: e.target.value })
                }
                required
              />
            </div>
            <button onClick={addBook} className="add-book-button" type="submit">
              Add Book
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddBook;
