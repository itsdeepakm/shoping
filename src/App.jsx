
import './App.css'
import Login from './components/login'
import { Route,Routes,Navigate } from 'react-router-dom'
import Register from './components/register'
import Home from './components/home'
function App() {
  

  return (
    <>
<Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/home" element={<Home/>}/>

</Routes>
    </>
  )
}

export default App
