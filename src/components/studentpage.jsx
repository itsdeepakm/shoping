import { useState } from "react";
import "../components/studentpage.css";
import Navbar from "./navbar";
import { Global } from "./global";

export default function Studentpage() {
  const [search, setSearch] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const books = JSON.parse(localStorage.getItem("books")) || [];

  const handleSearch = () => {
    const filtered = books.filter((bk) =>
      bk.title.toLowerCase().includes(search.toLowerCase()) ||
      bk.author.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredBooks(filtered);
  };
  const addtocart=(book)=>{
    Global.cart.push(book);
    localStorage.setItem("cart",JSON.stringify(Global.cart));
    Global.sum+=parseFloat(book.price);
    console.log(Global.sum);
    console.log(Global.cart);
  }
  function showprofile(){
    window.location.href="/studentprofile";
  }

  return (
    <>
      <Navbar />
      <button onClick={showprofile}>show my profile</button>
      <div className="search-container">
        <input
          className="input-field"
          type="text"
          placeholder="Search book..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      <h3 className="heading">Available Books</h3>

      {(filteredBooks.length > 0 ? filteredBooks : books).map((bk, index) => (
        <div key={index} className="book-display">
          <h3>{bk.title}</h3>
          <p>Author: {bk.author}</p>
          <p>Price: ${bk.price}</p>
          <p>Genre: {bk.genre}</p>
          <button onClick={addtocart(bk)}>Add to cart</button>
        </div>
      ))}
    </>
  );
}
