import { useState, useEffect } from "react";
import Navbar from "./navbar";
import { Global } from "./global";
import "./shopingcart.css";

export default function ShopingCart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [confirm,setconfirm]=useState(false);
  
  const [id,setid]=useState(null);
  useEffect(() => {
    const sum = cart.reduce((acc, item) => acc + parseFloat(item.price), 0);
    setTotal(sum);
    Global.sum = sum;
  }, [cart]);
  useEffect(() => {
    const fetchdata=async()=>{
    const response=await fetch("http://localhost:3000/api/cart");
    const data=await response.json();
    if(!response.ok){
      throw new Error(data.message ||"Could not fetch cart items");
    }
    setCart(data);
  
  }
  fetchdata();
  
  }, []);


  const removeFromCart = (id) => {
    setconfirm(true);
    setid(id)
    
  };
  const removeItemConfirmation=async(id)=>{
    const response = await fetch(`http://localhost:3000/api/cart/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not remove item from cart");
  }

  
  if (Array.isArray(data)) {
    setCart(data);
  } else {
  
    const newCart = await fetch("http://localhost:3000/api/cart");
    const updatedData = await newCart.json();
    setCart(updatedData);
  }

  setconfirm(false);

  }
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
            <button onClick={() => removeFromCart(item._id)}>Remove</button>
            <button>Buy Now</button>
          </div>
        ))
      )}
      {confirm && (
        <div className="confirmation-popup">
          <div className="confirmation-card"> 
            <h3>Item Removed</h3>
            <p>are you sure want to remove from cart.</p>
            <button onClick={() => {removeItemConfirmation(id); setconfirm(false);}}>Yes</button>
            <button onClick={() => setconfirm(false)}>Close</button>
          </div>
        </div>
      )}
      <h3>Total Price: ${total.toFixed(2)}</h3>
    </>
  );
}
