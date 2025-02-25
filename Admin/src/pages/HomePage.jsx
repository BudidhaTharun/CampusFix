import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './Home.css';
import LandingImage from '../assets/h2.png';
import c6 from '../assets/c6.png';
import config from '../config';

const HomePage = (props) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [role, setRole] = useState(''); // Default role for signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleEmailChange = (e) => {
    const input = e.target.value;
    setEmail(input);
    if (!input.includes('@')) {
      setEmailError('Email must contain @');
    } else {
      setEmailError('');
    }
  };

  const handleNameChange = (e) => setName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRoleChange = (e) => setRole(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? `${config}/api/auth/login`
      : `${config}/api/auth/register`;

    const requestData = {
      email,
      password,
      ...(isLogin ? {} : { name, role }),
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          alert('Login Successful!');
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', data.role);
          props.setToken(data.token);
          // Redirect based on the role (for now, if role is Student, redirect to /student; else /service)
          if (data.role === 'Student') {
            setRedirect('student');
          } else {
            setRedirect('service');
          }
        } else {
          alert('Signup Successful! Please login now.');
          setIsLogin(true);
        }
      } else {
        alert(data.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to connect to the server.');
    }
  };

  // IMPORTANT: Return the Navigate component so that redirection works
  if (redirect === 'student') {
    return <Navigate to="/student" replace />;
  } else if (redirect === 'service') {
    return <Navigate to="/service" replace />;
  }

  return (
    <div className="homepage-container">
      <div className="left-half">
        <div className="form-container">   
          <h2 className="form-subtitle">{isLogin ? 'Login' : 'Sign Up'}</h2>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="input-group">
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={handleNameChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Role</label>
                  <select value={role} onChange={handleRoleChange} required>
                    <option value="">Select your role</option>
                    <option value="Electrician">Electrician</option>
                    <option value="Plumber">Plumber</option>
                    <option value="Carpenter">Carpenter</option>
                    <option value="Student">Student</option>
                  </select>
                </div>
              </>
            )}
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                className={emailError ? 'error' : ''}
                required
              />
              {emailError && <small className="error-text">{emailError}</small>}
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <button type="submit" className="submit-btn">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>
          <p className="toggle-text">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Sign Up' : 'Login'}
            </span>
          </p>
        </div>
      </div>
      <div className="right-half">
  {/* New header added at the top */}
  <div className="image-header">
    <img src={c6} alt="CampusFix Logo" className="logo-image" />
    <h1 className="header-title">CampusFix</h1>
  </div>
  <div className="image-overlay"></div>
  <img src={LandingImage} alt="Landing" className="landing-image" />
  <div className="image-caption">
    <h2>Welcome to Our Service</h2>
    <p>Experience premium service solutions tailored for you.</p>
  </div>
</div>
    </div>
  );
};

export default HomePage;
