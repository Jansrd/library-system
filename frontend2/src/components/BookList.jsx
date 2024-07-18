// src/BookList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Book from "./Book";
import "../style/bookList.css";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [order, setOrder] = useState("title");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBooks();
  }, [order, search]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/books/order_by/?order=${order}`
      );
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const searchBooks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/books/search/?q=${search}`
      );
      setBooks(response.data);
    } catch (error) {
      console.error("Error searching books:", error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/books/${id}/`);
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleAvailabilityChange = async (id, available) => {
    try {
      const bookToUpdate = books.find((book) => book.id === id);
      await axios.put(`http://localhost:8000/api/books/${id}/`, {
        ...bookToUpdate,
        available,
      });
      setBooks(
        books.map((book) => (book.id === id ? { ...book, available } : book))
      );
    } catch (error) {
      console.error("Error updating availability:", error);
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value === "") {
      fetchBooks();
    } else {
      searchBooks();
    }
  };

  return (
    <div className="book-list">
      <div className="book-list-content">
        <h1>Library Books</h1>
        <div className="book-list-content-top">
          <input
            type="text"
            className="book-list-input"
            placeholder="Search by title or author"
            value={search}
            onChange={handleSearch}
          />
          <div className="book-list-controls">
            <label className="book-list-label">Order By: </label>
            <select
              className="book-list-select"
              onChange={(e) => setOrder(e.target.value)}
            >
              <option value="title">Title</option>
              <option value="available">Available</option>
              <option value="published_day">Published Day</option>
            </select>
          </div>
        </div>
        <ul className="books-list">
          {books.map((book) => (
            <Book
              key={book.id}
              book={book}
              onToggle={handleAvailabilityChange}
              onDelete={deleteBook}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookList;
