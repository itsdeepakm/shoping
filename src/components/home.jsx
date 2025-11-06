import Navbar from "./navbar"
import Bookform from "./bookform"
import "./home.css"
import Profile from "./profile"
export default function Home(){

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