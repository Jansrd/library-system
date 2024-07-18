// src/App.js
import React, { useState } from "react";
import Header from "./layouts/Header";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import "./App.css";
import "./style/responsive.css";

const App = () => {
  const [books, setBooks] = useState([]);

  const handleBookAdded = (newBook) => {
    setBooks([...books, newBook]);
  };

  return (
    <div className="app">
      <Header />
      <AddBook onBookAdded={handleBookAdded} />
      <BookList books={books} setBooks={setBooks} />
    </div>
  );
};

export default App;
