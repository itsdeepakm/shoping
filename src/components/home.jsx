import Navbar from "./navbar"
import Bookform from "./bookform"
import "./home.css"
import Profile from "./profile"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
export default function Home(){

 const navigate=useNavigate();
  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedInUser");

    
    if (!loggedUser) {
      navigate("/login", { replace: true });
    }

    
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      navigate("/login", { replace: true });
    };
  }, []);

    function showprofile(){
      window.location.href="/profile";
    }
  
    return (
        <>
        <Navbar/>
        <div></div>
        <button className="profile_button" onClick={showprofile}>showprofile</button>
        <Bookform/>
        </>
    )
}