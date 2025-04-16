import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Service.css';
import config from '../config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Services = () => {
  const token = localStorage.getItem('token') || 'SampleBearerToken';
  const [pendingRequests, setPendingRequests] = useState([]);
  const [historyRequests, setHistoryRequests] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('pending');
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 700;
      setIsMobile(mobile);
      if (!mobile) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchPendingRequests = async () => {
    try {
      const response = await fetch(`${config}/api/request/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch pending requests');
      const data = await response.json();
      setPendingRequests(data);
    } catch (error) {
      // console.error('Error fetching pending requests:', error.message);
      toast.error(' Error fetching pending request', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };


  const fetchHistoryRequests = async () => {
    try {
      const response = await fetch(`${config}/api/request/history`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch request history');
      const data = await response.json();
      setHistoryRequests(data);
    } catch (error) {
      // console.error('Error fetching history:', error.message);
      toast.error('Error fetching history', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  useEffect(() => {
    fetchPendingRequests();
    fetchHistoryRequests();
  }, [token]);

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
      toast.success('Request accepted successfully!', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      // alert('Request accepted successfully!');
      fetchPendingRequests();
      fetchHistoryRequests();
    } catch (error) {
      console.error('Error accepting request:', error.message);
      toast.error(`Error: ${error.message}`, {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

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
      toast.success('Request Completed successfully!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      fetchHistoryRequests();
    } catch (error) {
      console.error('Error marking request as successful:', error.message);
      // alert(`Error: ${error.message}`);
      toast.error(`Error: ${error.message}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleLogout = () => {
    toast.info(`  Log Out Succesfully`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    setTimeout(() => {
      localStorage.removeItem('token');
    navigate('/');
    }, 3000);
    
  };

  return (
    <div className="service-page">
      <header className="service-header">
        <div className="logo">
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
          <span className="head-name">CampusFix</span>
        </div>
        {isMobile ? (
          <>
            <button className="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? '✕' : '☰'}
            </button>
            {isMenuOpen && (
              <nav className="mobile-menu">
                <button className='btn-menu'onClick={() => { setActiveTab('pending'); setIsMenuOpen(false); }}>
                  Pending Requests
                </button>
                <button className='btn-menu' onClick={() => { setActiveTab('history'); setIsMenuOpen(false); }}>
                  History
                </button>
                <button className='btn-menu' onClick={() => { handleLogout(); setIsMenuOpen(false); }}>
                  Logout
                </button>
              </nav>
            )}
          </>
        ) : (
          
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        )}
      </header>

      <div className="content-section">
        {(!isMobile || activeTab === 'pending') && (
          <div className="pending-section">
            <h2 className="section-title bungee-tint-regular">Pending Requests</h2>
            <div className="pending-container">
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
          </div>
        )}

        {(!isMobile || activeTab === 'history') && (
          <div className="history-section">
            <h2 className="section-title bungee-tint-regular">Request History</h2>
            <div className="history-container">
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
                        <span className={`status ${req.status.toLowerCase()}`}>{req.status}</span>
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
        )}
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Services;
