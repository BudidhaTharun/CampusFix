import React, { useState } from "react";
import compilerLogo from '../assets/compiler.png'; 
const SignUp = () => {

  const [email, setEmail] = useState("");
  const [name,setname] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");


  const headerStyle = {
            position: 'absolute',
            top: '2rem',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
            width: '100%',
            color: '#333',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          };
          const halfStyle = {
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          };
          const formStyle = {
            backgroundColor: '#fff',
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            width: '80%',
            maxWidth: '400px',
          };
  const handleEmailChange = (e) => {
    const input = e.target.value;
    setEmail(input);
    if (!input.includes("@")) {
      setEmailError("Email must contain @");
    } else {
      setEmailError("");
    }
  };
  const handlenamechange =(e)=>{
    const input = e.target.value;
    setname(input);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailError && email && password) {
      alert("Sign Up Successful!");
    } else {
      alert("Please fix the errors before submitting");
    }
  };

  return (
    <div style={halfStyle}>
        <div style={headerStyle}> <img src={compilerLogo } style={{ height:"1.5em"
            ,width:"2em",
            margin:"0.5em",
            fontfamily: "Arial,Helvetica,sans-serif",
        }}/>Online Compiler</div>
      <div
      style={{
        backgroundColor: "#fff",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        width: "80%",
        maxWidth: "400px",
        margin: "auto",
        marginTop: "2rem",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" ,formStyle}}>
        <label>Name</label>
          <input
            type="text"
            placeholder="Enter your email"
            value={name}
            onChange={handlenamechange}
            style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
            }}
          />
          </div>
        <div style={{ marginBottom: "1rem" ,formStyle}}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "4px",
              border: emailError ? "1px solid red" : "1px solid #ccc",
            }}
          />
          {emailError && (
            <small style={{ color: "red", marginTop: "0.5rem", display: "block" }}>
              {emailError}
            </small>
          )}
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>
            <input type="checkbox" /> I agree to the Terms and Conditions
          </label>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#007BFF",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Sign Up
        </button>
        <span style={{ display: "block", width: "100%", textAlign: "center", fontSize: "1rem", fontWeight: "bold", color: "#333" }}>
  or
</span>

          <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#007BFF",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
    </div>
   
  );
};

export default SignUp;
