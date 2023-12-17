import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [loginAttempted, setLoginAttempted] = useState(false); // New state variable

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear the corresponding error when the user starts typing
    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Validation logic (add more as needed)
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
      valid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setLoginAttempted(true); // Set loginAttempted to true when attempting login

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (response.status === 200) {
        console.log('Login successful!');
        navigate('/fileupload');
        // You may redirect the user or perform other actions upon successful login
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData.error);
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {loginAttempted && (
        <p style={{ color: 'red', margin: '15px 0' }}>Login failed. Please register first.</p>
      )}
      <div>
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          style={{
            width: '100%',
            padding: '10px',
            margin: '10px 0', // Added margin-top
            borderRadius: '5px',
            border: `1px solid ${errors.email ? 'red' : '#ccc'}`,
          }}
        />
        {errors.email && <p style={{ color: 'red', margin: '5px 0' }}>{errors.email}</p>}
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          style={{
            width: '100%',
            padding: '10px',
            margin: '10px 0', // Added margin-top
            borderRadius: '5px',
            border: `1px solid ${errors.password ? 'red' : '#ccc'}`,
          }}
        />
        {errors.password && <p style={{ color: 'red', margin: '5px 0' }}>{errors.password}</p>}
      </div>

      <button
        type="submit"
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '10px 15px',
          margin: '10px 0',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Login
      </button>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </form>
  );
};

export default Login;
