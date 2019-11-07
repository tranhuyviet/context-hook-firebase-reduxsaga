import React, { useContext, useState } from "react";
import { BookContext } from "../contexts/BookContext";

const BookForm = () => {
  const { addBook } = useContext(BookContext);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    addBook(title, author);
    setTitle("");
    setAuthor("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="book title"
        required
      />
      <input
        type="text"
        name="author"
        value={author}
        onChange={e => setAuthor(e.target.value)}
        placeholder="author"
        required
      />
      <input type="submit" value="add book" />
    </form>
  );
};

export default BookForm;
