import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });

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
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

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

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        console.log('Registration successful!');
        navigate('/fileupload');
        // You may redirect the user or perform other actions upon successful registration
      } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData.error);
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
      alert('Error');
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            borderRadius: '5px',
            transition: 'background-color 0.3s ease',
            marginTop: '10px',
          }}
        >
          Register
        </button>

        <p>
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </div>
    </form>
  );
};

export default Register;
