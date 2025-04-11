
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Service.css';
import config from '../config';

const Services = () => {
  const token = localStorage.getItem('token') || 'SampleBearerToken';
  const [pendingRequests, setPendingRequests] = useState([]);
  const [historyRequests, setHistoryRequests] = useState([]);
  const navigate = useNavigate();

  // Fetch pending requests (for the service person, e.g., Electrician)
  const fetchPendingRequests = async () => {
    try {
      const response = await fetch(`${config}/api/request/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch pending requests');
      }
      const data = await response.json();
      // Assuming the endpoint returns an array of pending requests
      setPendingRequests(data);
    } catch (error) {
      console.error('Error fetching pending requests:', error.message);
    }
  };

  // Fetch service history (requests accepted by the service person)
  const fetchHistoryRequests = async () => {
    try {
      const response = await fetch(`${config}/api/request/history`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch request history');
      }
      const data = await response.json();
      setHistoryRequests(data);
    } catch (error) {
      console.error('Error fetching history:', error.message);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchPendingRequests();
    fetchHistoryRequests();
  }, [token]);

  // Handle Accept: Service person accepts a request
  const handleAccept = async (id) => {
    try {
      const response = await fetch(`${config}/api/request/${id}/accept`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to accept request');
      }
      alert('Request accepted successfully!');
      // Refresh both lists after accepting
      fetchPendingRequests();
      fetchHistoryRequests();
    } catch (error) {
      console.error('Error accepting request:', error.message);
      alert(`Error: ${error.message}`);
    }
  };

  // Handle Mark as Successful: Service person marks a processing request as successful
  const handleMarkSuccessful = async (id) => {
    try {
      const response = await fetch(`${config}/api/request/${id}/success`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to mark request as successful');
      }
      alert('Request marked as successful!');
      // Refresh history list
      fetchHistoryRequests();
    } catch (error) {
      console.error('Error marking request as successful:', error.message);
      alert(`Error: ${error.message}`);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    // navigate('/'); // Redirect to Homepage (login)
    window.location.href='/';
  };

  return (
    <div className="service-page">
      <header className="service-header">
        <h1>Service Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>
      <div className="content-section">
        <div className="pending-section">
          <h2 className="section-title">Pending Requests</h2>
          {pendingRequests.length === 0 ? (
            <p className="no-data">No pending requests.</p>
          ) : (
            <ul className="pending-list">
              {pendingRequests.map((req) => (
                <li key={req._id} className="pending-item">
                  <p><strong>Room:</strong> {req.roomNumber}</p>
                  <p><strong>Problem:</strong> {req.description}</p>
                  <p><strong>Service:</strong> {req.serviceType}</p>
                  <button className="action-btn" onClick={() => handleAccept(req._id)}>
                    Accept
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="history-section">
          <h2 className="section-title">Request History</h2>
          {historyRequests.length === 0 ? (
            <p className="no-data">No history available.</p>
          ) : (
            <ul className="history-list">
              {historyRequests.map((req) => (
                <li key={req._id} className="history-item">
                  <p><strong>Room:</strong> {req.roomNumber}</p>
                  <p><strong>Problem:</strong> {req.description}</p>
                  <p>
                    <strong>Status:</strong>{' '}
                    <span className={`status ${req.status.toLowerCase()}`}>
                      {req.status}
                    </span>
                  </p>
                  {req.status === 'Processing' && (
                    <button className="action-btn" onClick={() => handleMarkSuccessful(req._id)}>
                      Mark as Successful
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
