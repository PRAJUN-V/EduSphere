import React, { useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/users/Login";
import { Register } from "./pages/users/Register";
import Home from "./pages/users/Home";
import { NotFound } from "./pages/common/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { Dashboard as InstructorDashboard } from "./pages/instructor/Dashboard";
import { Profile } from "./pages/users/Profile";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "./redux/user";
import { AdminDashboard } from "./pages/admin/AdminDashboard";

function Logout() {
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.clear();
    dispatch(clearUser());
  }, [dispatch]);

  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem('access');
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      const userData = {
        id: decodedToken.user_id,
        username: decodedToken.username,
        email: decodedToken.email,
        first_name: decodedToken.first_name,
        last_name: decodedToken.last_name,
        role: decodedToken.role,
      };
      dispatch(setUser(userData));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/instructor/dashboard" element={
          <ProtectedRoute requiredRole="instructor">
            <InstructorDashboard />
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />

        <Route path="/admin/dashboard" element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />

        <Route path="/student/dashboard" element={
          <ProtectedRoute requiredRole="student">
            <Home />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
