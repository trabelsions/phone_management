import LoginPage from "pages/LoginPage/LoginPage";
import ProfilePage from "layouts/AdminLayout";
import RegisterPage from "pages/RegisterPage/RegisterPage";
import ProtectedRoute from "protected/ProtectedRoute";
import { Navigate, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function AppRoutes() {
  return (
    <div>

      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default AppRoutes;
