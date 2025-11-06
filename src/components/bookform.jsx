import "./bookform.css";
import { useState,useEffect } from "react";

export default function Bookform() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    price: "",
    genre: "",
  });
  const [books, setBooks] = useState([]);
  const [edit,setedit]=useState(null);
  
  useEffect(()=>{
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
    setBooks(storedBooks);
  },[]);
  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  let updatedBooks = [...books];
  
  if (edit !== null) {
    updatedBooks[edit] = book;
    setedit(null);
  } else {
    updatedBooks.push(book);
  }

  setBooks(updatedBooks);
  localStorage.setItem("books", JSON.stringify(updatedBooks));
  setBook({ title: "", author: "", price: "", genre: "" });
};



  function deleteBook(index){
    const updatedBooks = books.filter((j, i) => i !== index);
    setBooks(updatedBooks);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
  }
  function editBook(index){
    const bookToEdit = books[index];
    setBook(bookToEdit);
    setedit(index);

  }
    

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
    {books.map((bk, index) => (
      <div key={index} className="book-display">
        <h3>{bk.title}</h3>
        <p>Author: {bk.author}</p>
        <p>Price: ${bk.price}</p>
        <p>Genre: {bk.genre}</p>
        <button onClick={()=>deleteBook(index)}>delete</button>
        <button onClick={()=>editBook(index)}>edit</button>
      </div>
    ))}
    </>
  );
}
