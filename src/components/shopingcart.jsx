import { useState, useEffect } from "react";
import Navbar from "./navbar";
import { Global } from "./global";
import "./shopingcart.css";

export default function ShopingCart() {
  const [cart, setCart] = useState(
    Global.cart.length ? Global.cart : JSON.parse(localStorage.getItem("cart")) || []
  );
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const sum = cart.reduce((acc, item) => acc + parseFloat(item.price), 0);
    setTotal(sum);
    Global.sum = sum;
  }, [cart]);

  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    Global.cart = updatedCart;
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <>
      <Navbar />
      <h2>Items in cart: {cart.length}</h2>
      {cart.length === 0 ? (
        <p>No items in your cart.</p>
      ) : (
        cart.map((item, index) => (
          <div key={index} className="book-display">
            <h3>{item.title}</h3>
            <p>Author: {item.author}</p>
            <p>Price: ${item.price}</p>
            <p>Genre: {item.genre}</p>
            <button onClick={() => removeFromCart(index)}>Remove</button>
            <button>Buy Now</button>
          </div>
        ))
      )}
      <h3>Total Price: ${total.toFixed(2)}</h3>
    </>
  );
}
