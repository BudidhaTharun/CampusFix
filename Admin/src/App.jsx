import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Student from './pages/Student';
import Service from './pages/Service';

function App() {
  // Optionally keep token state if you plan to update it via HomePage
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage setToken={setToken} />} />
        <Route path="/student" element={<Student />} />
        <Route path="/service" element={<Service />} />
        {/* Catch-all route, which renders HomePage */}
        <Route path="*" element={<HomePage setToken={setToken} />} />
      </Routes>
    </Router>
  );
}

export default App;
