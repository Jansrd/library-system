import React from "react";
import "../style/book.css";

const Book = ({ book, onToggle, onDelete }) => {
  return (
    <div className="book">
      <li className="book-list-item" key={book.id}>
        <div className="book-list-item-content">
          <div className="book-list-details">
            <p>
              <span className="book-title">{book.title}</span> by
              <span className="book-author"> {book.author}</span> - Published on{" "}
              {book.published_day}
            </p>
            <div className="vertical-line"></div>
            <span
              className={
                !book.available ? "book-available" : "book-unavailable"
              }
            >
              {!book.available ? "Available" : "Not Available"}
            </span>
          </div>
          <div className="book-list-actions">
            <div className="book-list-actions-rent">
              <label>Out for rent:</label>
              <input
                type="checkbox"
                checked={book.available}
                onChange={(e) => onToggle(book.id, e.target.checked)}
              />
            </div>
            <button
              className="book-list-delete"
              onClick={() => onDelete(book.id)}
            >
              X
            </button>
          </div>
        </div>
      </li>
    </div>
  );
};

export default Book;
