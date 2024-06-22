import { Navigate } from "react-router-dom";
import Navbar from "components/Navbar";

function ProtectedRoute({ children }: any) {
  const token = localStorage.getItem("authToken");
  if (token) {

    return children;
  }
  return <Navigate to="/login" />;
}

export default ProtectedRoute;
