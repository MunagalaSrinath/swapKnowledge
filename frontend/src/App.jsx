// 📄 src/App.jsx
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import SkillsPage from "./pages/SkillsPage";
import SwapRequestsPage from "./pages/SwapRequestsPage";
import PrivateRoute from "./auth/PrivateRoute";

const App = () => {
  console.log("Rendering App.jsx");

  return (
    <Routes>
      {/* 👇 These must be public for initial access */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* 👇 Protected routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/skills"
        element={
          <PrivateRoute>
            <SkillsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/swaps"
        element={
          <PrivateRoute>
            <SwapRequestsPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;
