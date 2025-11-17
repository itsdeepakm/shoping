import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const loggedUser = localStorage.getItem("loggedInUser");

  if (!loggedUser) {
    return <Navigate to="/homepage" replace />;
  }

  return children;
}
