
import './App.css'
import Login from './components/login'
import { Route,Routes,Navigate } from 'react-router-dom'
import Register from './components/register'
import Home from './components/home'
import Bookform from './components/bookform'
import Studentpage from './components/studentpage'
import ShopingCart from './components/shopingcart'
import Homepage from './components/homepage'
import Profile from './components/profile'
function App() {
  

  return (
    <>
<Routes>
      <Route path="/" element={<Navigate to="/homepage" replace />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/studentpage" element={<Studentpage/>}/>
      <Route path="/bookform" element={<Bookform/>}/>
      <Route path="/cart" element={<ShopingCart/>}/>
      <Route path="/homepage" element={<Homepage/>}/>
      <Route path="/profile" element={<Profile/>}/>

</Routes>
    </>
  )
}

export default App
