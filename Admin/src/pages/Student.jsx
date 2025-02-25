import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Student.css';
import History from './History';
import config from '../config';

const Student = () => {
  const token = localStorage.getItem('token') || 'SampleBearerToken';
  const navigate = useNavigate();
  const [roomNumber, setRoomNumber] = useState('');
  const [description, setDescription] = useState('');
  const [serviceType, setServiceType] = useState('');

  // Submit new service request
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!roomNumber || !description || !serviceType) {
      alert('Please fill all fields.');
      return;
    }
  
    const requestData = {
      roomNumber,
      description,
      serviceType,
    };
  
    try {
      const response = await fetch(`${config}/api/request/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }
  
      const data = await response.json();
      console.log('Request submitted successfully:', data);
      alert('Request submitted successfully!');
  
      // Clear the form fields
      setRoomNumber('');
      setDescription('');
      setServiceType('');
    } catch (error) {
      console.error('Error submitting request:', error.message);
      alert(`Error: ${error.message}`);
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = "/"
  };

  return (
    <div className="student-page">
      <header className="student-header">
        <h1>Student Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <div className="student-content">
        <div className="form-section">
          <h2 className="section-title">New Service Request</h2>
          <form onSubmit={handleSubmit} className="request-form">
            <div className="form-group">
              <label>Room Number</label>
              <input
                type="text"
                placeholder="Enter your room number"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                style={{ color: 'black' }}
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                placeholder="Describe your issue or request"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label>Service Type</label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                required
              >
                <option value="">Select Service</option>
                <option value="Electrician">Electrician</option>
                <option value="Plumber">Plumber</option>
                <option value="Carpenter">Carpenter</option>
              </select>
            </div>
            <button type="submit" className="submit-btn">
              Submit Request
            </button>
          </form>
        </div>
        <div className="history-section">
          <h2 className="section-title">Request History</h2>
          <History />
        </div>
      </div>
    </div>
  );
};

export default Student;
