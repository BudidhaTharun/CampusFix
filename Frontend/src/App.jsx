import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ProtectedRoute from "./components/ProtectedRoute"; // Adjust the path if needed
import Student from "./pages/Student";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Protected Route */}
        <Route
          path="/services"
          element={
            <ProtectedRoute>
              <Services />
            </ProtectedRoute>
          }
        />
        <Route 
        path="/student"
        element={
          <ProtectedRoute>
            <Student/>
          </ProtectedRoute>
        }
        />
      </Routes>
    </Router>
  );
}

export default App;
