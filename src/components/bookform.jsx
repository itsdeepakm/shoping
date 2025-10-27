import "./bookform.css";
import { useState } from "react";

export default function Bookform() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    price: "",
    genre: "",
  });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Book Added:", book);
    localStorage.setItem("books", JSON.stringify(book));

    setBook({ title: "", author: "", price: "", genre: "" });
  };

  return (
    <>
    <div className="bookform-container">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit} className="book-form">
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            placeholder="Enter book title"
            required
          />
        </div>

        <div className="form-group">
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            placeholder="Enter author name"
            required
          />
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={book.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
          />
        </div>

        <div className="form-group">
          <label>Genre:</label>
          <input
            type="text"
            name="genre"
            value={book.genre}
            onChange={handleChange}
            placeholder="Enter genre"
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Book
        </button>
      </form>

    </div>
    </>
  );
}
