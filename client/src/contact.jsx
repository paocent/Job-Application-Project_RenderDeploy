// src/components/Contact.jsx
import React, { useState } from 'react';
import './src-CSS/contact.css';

const API_URL = import.meta.env.VITE_API_URL; // Use your backend URL

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const [feedback, setFeedback] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Reset form
  const handleReset = () => {
    setFormData({ firstName: '', lastName: '', email: '', message: '' });
    setFeedback('');
    setIsSuccess(false);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback('Sending message...');
    setIsSuccess(false);

    try {
      // ✅ Send to correct endpoint: /api/contact
      // src/components/Contact.jsx
const response = await fetch(`${API_URL}/api/contactForms`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData),
});


      if (response.ok) {
        setFeedback('Thank you! Your message has been sent successfully. 📧');
        setIsSuccess(true);
        handleReset(); // Clear form after success
      } else {
        const errorData = await response.json().catch(() => ({}));
        setFeedback(`Failed to send message: ${errorData.error || response.statusText}`);
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Network Error:', error);
      setFeedback('A network error occurred. Please try again later.');
      setIsSuccess(false);
    }
  };

  return (
    <div className="form-container">
      <h1 className="header">🤝 Contact the JAT Developer</h1>

      <p className="text-body" style={{ textAlign: 'center', marginBottom: '30px' }}>
        Have a suggestion, found a bug, or just want to connect? Send a message below.
      </p>

      <hr />

      {/* Feedback message */}
      {feedback && (
        <p
          style={{
            color: isSuccess ? 'green' : 'red',
            fontWeight: 'bold',
            textAlign: 'center',
            padding: '10px',
          }}
        >
          {feedback}
        </p>
      )}

      {/* Form */}
      <form className="standard-form" onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name (Required):</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <label htmlFor="lastName">Last Name (Required):</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Your Email (Required):</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="message">Your Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />

        <button type="submit">Send Message</button>
        <button
          type="button"
          onClick={handleReset}
          style={{ backgroundColor: '#888', marginTop: '10px' }}
        >
          Clear Form
        </button>
      </form>
    </div>
  );
}
