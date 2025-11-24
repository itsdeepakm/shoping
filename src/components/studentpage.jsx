import { useState,useEffect } from "react";
import "../components/studentpage.css";
import Navbar from "./navbar";
import { Global } from "./global";

export default function Studentpage() {
  const [search, setSearch] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [stockMessage, setStockMessage] = useState("");
  const [books, setBooks] = useState([]);

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

  const handleSearch = () => {
    const filtered = books.filter((bk) =>
      bk.title.toLowerCase().includes(search.toLowerCase()) ||
      bk.author.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

const addtoCart=async(bk)=>{
  const cartRes=await fetch("http://localhost:3000/api/cart");
  const cartData=await cartRes.json();
  const count = cartData.filter(item => item.title === bk.title).length;
  if(count>=5){
    setStockMessage(`Item "${bk.title}" is out of stock.`);
    return;
  }

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

  const showprofile = () => {
    window.location.href = "/studentprofile";
  };

  return (
    <>
      <Navbar />
      <button onClick={showprofile}>show my profile</button>

      {stockMessage && (
  <div className="stock-popup">
    <div className="stock-card">
      <h3>Out of Stock</h3>
      <p>{stockMessage}</p>
      <button onClick={() => setStockMessage("")}>Close</button>
    </div>
  </div>
)}

      <div className="search-container">
        <input
          className="input-field"
          type="text"
          placeholder="Search book..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn" onClick={handleSearch}>Search</button>
      </div>

      <h3 className="heading">Available Books</h3>

      {(filteredBooks.length > 0 ? filteredBooks : books).map((bk, index) => (
        <div key={index} className="book-display">
          <h3>{bk.title}</h3>
          <p>Author: {bk.author}</p>
          <p>Price: ${bk.price}</p>
          <p>Genre: {bk.genre}</p>
          <button onClick={() => addtoCart(bk)}>Add to cart</button>
        </div>
      ))}
    </>
  );
}
