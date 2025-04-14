import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Student.css';
import config from '../config';

const Student = () => {
  const token = localStorage.getItem('token') || 'SampleBearerToken';
  const navigate = useNavigate();
  const [roomNumber, setRoomNumber] = useState('');
  const [description, setDescription] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [requests, setRequests] = useState([]);

  // Submit new service request
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!roomNumber || !description || !serviceType) {
      alert('Please fill all fields.');
      return;
    }

    const requestData = { roomNumber, description, serviceType };

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
      alert('Request submitted successfully!');
      setRoomNumber('');
      setDescription('');
      setServiceType('');
      fetchRequests(); // Refresh history
    } catch (error) {
      console.error('Error submitting request:', error.message);
      alert(`Error: ${error.message}`);
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = "/";
  };

  // Fetch history
  const fetchRequests = async () => {
    try {
      const response = await fetch(`${config}/api/request/student-history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch service requests');
      }

      const data = await response.json();
      setRequests(data.reverse());
    } catch (error) {
      console.error('Error fetching requests:', error.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="student-page">
        <header className="service-header">
      <div
          className="logo"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <img
            src="https://thumbs.dreamstime.com/b/electrician-has-screwdriver-his-hand-89764045.jpg?w=768"
            alt="logo"
            style={{
              width: '100px',
              height: '80px',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
          <span
            style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              fontFamily: "'Vollkorn', serif",
            }}
            className='head-name'
          >
            CampusFix
          </span>
        </div>
        <button className="logout-btn btn-primary" onClick={handleLogout}>Logout</button>
      </header>


      <div className="student-content">
        {/* Form Section */}
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

        {/* History Section */}
        <div className="history-section">
          <h2 className="section-title">Request History</h2>
          <div className="history-container">
            {requests.length === 0 ? (
              <p className="no-requests">No service requests found.</p>
            ) : (
              <ul className="request-list">
                {requests.map((request) => (
                  <li key={request._id} className="request-item">
                    <div className="request-header">
                      <strong>Service Type:</strong> {request.serviceType}
                    </div>
                    <div className="request-body">
                      <p><strong>Description:</strong> {request.description}</p>
                      <p>
                        <strong>Status:</strong>{' '}
                        <span className={`status ${request.status.toLowerCase()}`}>
                          {request.status}
                        </span>
                      </p>
                      <p>
                        <strong>Room:</strong> {request.roomNumber}
                      </p>
                      <p>
                        <strong>Message:</strong> {request.message || 'No message yet'}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
