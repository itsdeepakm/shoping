
import React from "react";
import "./homepage.css";

export default function Home() {
    const handleclick=()=>{
        window.location.href="/login";
    }
  return (
    <div className="home-container">
    
      <nav className="navbar">
        <div className="logo"> BookStore</div>
        <ul className="nav-links">
          <li>Home</li>
          <li>Shop</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
        <button className="login-btn" onClick={handleclick}>Login</button>
      </nav>

      
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to BookStore</h1>
          <p>Your one-stop destination for books, stories, and imagination.</p>
          <button className="explore-btn">Explore Now</button>
        </div>
      </section>

      
      <footer>
        <p> 2025 BookStore. All rights reserved.</p>
      </footer>
    </div>
  );
}
