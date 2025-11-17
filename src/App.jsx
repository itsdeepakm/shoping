import './App.css';
import Login from './components/login';
import Register from './components/register';
import Home from './components/home';
import Bookform from './components/bookform';
import Studentpage from './components/studentpage';
import ShopingCart from './components/shopingcart';
import Homepage from './components/homepage';
import Profile from './components/profile';
import Studentprofile from './components/studentprofile';
import ProtectedRoute from './protectroute';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function App() {

  const location = useLocation();

  useEffect(() => {
  
    const token = localStorage.getItem("token");

    if (token) {
      window.history.pushState(null, "", window.location.href);

      const block = () => {
        window.history.pushState(null, "", window.location.href);
      };

      window.addEventListener("popstate", block);

      return () => {
        window.removeEventListener("popstate", block);
      };
    }
  }, [location]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/homepage" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/studentpage" element={<ProtectedRoute><Studentpage /></ProtectedRoute>} />
        <Route path="/bookform" element={<ProtectedRoute><Bookform /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><ShopingCart /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/studentprofile" element={<ProtectedRoute><Studentprofile /></ProtectedRoute>} />

        <Route path="/homepage" element={<Homepage />} />
      </Routes>
    </>
  );
}

export default App;
