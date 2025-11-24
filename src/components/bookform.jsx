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
  const [confirm,setconfirm]=useState(false);
  const [currentitem,setcurrentitem]=useState(null);
  
  useEffect(() => {
  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/books");
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setBooks(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  fetchBooks();
}, []);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
  e.preventDefault();
  const response=await fetch("http://localhost:3000/api/books",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(book)
  });
  const data=await response.json();
  if(!response.ok){
    throw new Error(data.message ||"Could not add book");
  }
  setBooks([...books,data.book]);
  console.log(data);
  setBook({
    title: "",
    author: "",
    genre: "",
    price: "",
  });
};



  function deleteBook(id){
    setconfirm(true);
    setcurrentitem(id);
  }
  const handledelete=async(id)=>{
    const response=await fetch(`http://localhost:3000/api/books/${id}`,{
      method:"DELETE",
    });
    const data=await response.json();
    if(!response.ok){
      throw new Error(data.message ||"Could not delete book");
    }
    setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
   
    
    
  
  }
  function editBook(id) {
  const selectedBook = books.find((b) => b._id === id);
  setBook(selectedBook);
  setedit(id);  
}
const handleUpdate = async () => {
  const response = await fetch(`http://localhost:3000/api/books/${edit}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not edit book");
  }

  
  setBooks((prevBooks) =>
    prevBooks.map((b) => (b._id === edit ? data.book : b))
  );

  
  setBook({
    title: "",
    author: "",
    genre: "",
    price: "",
  });

  setedit(null);
};
const addtoCart=async(bk)=>{
  const response=await fetch("http://localhost:3000/api/cart",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },  
    body:JSON.stringify(bk)
  });
  const data=await response.json();
  if(!response.ok){
    throw new Error(data.message ||"Could not add to cart");
  }
  console.log(data);
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

        <button
      type={edit ? "button" : "submit"}
      className="submit-btn"
      onClick={edit ? handleUpdate : null}
       >
      {edit ? "Update Book" : "Add Book"}
      </button>

      </form>

    </div>
    {books.map((bk, index) => (
      <div key={index} className="book-display">
        <h3>{bk.title}</h3>
        <p>Author: {bk.author}</p>
        <p>Price: ${bk.price}</p>
        <p>Genre: {bk.genre}</p>
        <button onClick={()=>deleteBook(bk._id)}>delete</button>
        <button onClick={()=>editBook(bk._id)}>edit</button>
        {/* <button onClick={()=>addtoCart(bk)}>Add to Cart</button> */}
      </div>
    ))}
    {confirm && (
        <div className="confirmation-popup">
          <div className="confirmation-card"> 
            <h3>Item Removed</h3>
            <p>are you sure want to remove .</p>
            <button onClick={() => {handledelete(currentitem); setconfirm(false);}}>Yes</button>
            <button onClick={() => setconfirm(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
