import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, UserCog } from 'lucide-react';
import './LoginPage.css';
import config from '../config';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     navigate('/student', { replace: true });
  //   }
  // }, [navigate]);

  const handlechangename = (e) => setName(e.target.value);
  const handlechangerole = (e) => setRole(e.target.value);
  const handlechangeemail = (e) => setEmail(e.target.value);
  const handlechangepassword = (e) => setPassword(e.target.value);

  const handlesubmit = async (e) => {
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
          toast.success('Login Successful!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', data.role);
          setTimeout(() => {
            const userRole = localStorage.getItem('role');
            if (userRole === 'Student') {
              navigate('/student', { replace: true });
            } else {
              navigate('/student', { replace: true });
            }
  
          }, 2000);
        } else {
          toast.success("Signup Successful! Please login now.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setIsLogin(true);
        }
      } else {
        toast.error(data.message || "Something went wrong", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to connect to the server.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-left">
          <div className="login-header">
            <h1>CampusFix</h1>
            <p>Streamline your campus maintenance experience</p>
          </div>
          <div className="login-image">
            <img 
              src="https://res.cloudinary.com/tharunbudidha/image/upload/v1744152469/cttt-removebg-preview_xxbgag.png" 
              alt="Campus"
            />
          </div>
        </div>

        <div className="login-right">
          <div className="form-container">
            <h2>{isLogin ? 'Welcome Back!' : 'Create Account'}</h2>
            <p className="form-subtitle">
              {isLogin 
                ? 'Please enter your details to sign in' 
                : 'Register to manage campus facilities'}
            </p>

            <form className="auth-form" onSubmit={handlesubmit}>
              {!isLogin && (
                <>
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <div className="input-group">
                      <User size={20} />
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={handlechangename}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <div className="input-group">
                      <UserCog size={20} />
                      <select
                        id="role"
                        value={role}
                        onChange={handlechangerole}
                        required
                      >
                        <option value="">Select your role</option>
                        <option value="Electrician">Electrician</option>
                        <option value="Plumber">Plumber</option>
                        <option value="Carpenter">Carpenter</option>
                        <option value="Student">Student</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-group">
                  <Mail size={20} />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handlechangeemail}
                    placeholder="name@college.edu"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-group">
                  <Lock size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlechangepassword}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="form-extra">
                  <div className="remember-me">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">Remember me</label>
                  </div>
                  <a href="#" className="forgot-password">Forgot password?</a>
                </div>
              )}

              <button type="submit" className="submit-btn">
                {isLogin ? 'Sign In' : 'Create Account'}
                <ArrowRight size={20} />
              </button>
            </form>

            <p className="toggle-form">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button onClick={toggleForm} className="toggle-btn">
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;