import "./navbar.css";
import Logout from "../assets/logout.png";
import Logo from "../assets/book.png";
import Cart from "../assets/cart.png";
import { Global } from "./global";
export default function Navbar() {
  
  const handlelogout=()=>{
    Global.currentUser=null;
    window.location.href="/login";
  }
  return (
    <>
      <nav className="navbar">
       <div className="nav-left">
        <div><img src={Logo}></img></div>
        <div><h3>BookShop</h3></div>
        </div>

        <div className="nav-right">
            <div className="welcome">Welcome,{Global.currentUser.username}</div>
            <div><button><img src={Cart} className="logo"></img>Cart</button></div>
            <div className="logout"><button onClick={handlelogout}><img src={Logout}></img>Logout</button></div>
        </div>
      </nav>
    </>
  );
}