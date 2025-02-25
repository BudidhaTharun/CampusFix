import React, { useEffect, useState } from 'react';
import './History.css';

function History() {
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem('token') || 'SampleBearerToken';

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/request/student-history', {
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

    fetchRequests();
  }, [token]);

  return (
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
  );
}

export default History;
