
import './App.css'
import Login from './components/login'
import { Route,Routes,Navigate } from 'react-router-dom'
import Register from './components/register'

function App() {
  

  return (
    <>
<Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>

</Routes>
    </>
  )
}

export default App
