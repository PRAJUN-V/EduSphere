import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Login } from "./pages/users/Login"
import { Register } from "./pages/users/Register"
import Home from "./pages/users/Home"
import { NotFound } from "./pages/common/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"

function Logout() {
  localStorage.clear()
  return <Navigate t="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={
            <Login />
          }
        />

        <Route
          path="/logout"
          element={
            <Logout />
          }
        />

        <Route
          path="/register"
          element={
            <RegisterAndLogout />
          }
        />

        <Route
          path="*"
          element={
            <NotFound />
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App
