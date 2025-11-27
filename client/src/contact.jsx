import React, { useState } from 'react';
import './src-CSS/contact.css';

export default function Contact() {
  // 1. State now includes separate firstName and lastName
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const [feedback, setFeedback] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Function to update the 'state' when the user types
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback('Sending message...');

    const dataToSend = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      message: formData.message,
    };

    try {
      // ⚠️ Make sure your Express route for contact form submission is working at /api/contact
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        setFeedback('Thank you! Your message has been sent successfully. 📧');
        setIsSuccess(true);
        // Clear the form after successful submission
        setFormData({ firstName: '', lastName: '', email: '', message: '' });
      } else {
        const errorData = await response.json();
        setFeedback(`Failed to send message: ${errorData.error || response.statusText}`);
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Network Error:', error);
      setFeedback('A network error occurred.');
      setIsSuccess(false);
    }
  };

  const handleReset = () => {
    setFormData({ firstName: '', lastName: '', email: '', message: '' });
    setFeedback('');
    setIsSuccess(false);
  };

  return (
    <>
      <div className="form-container">
        
        <h1 className="header">🤝 Contact the JAT Developer</h1>

        <p className="text-body" style={{textAlign: 'center', marginBottom: '30px'}}>
            Have a suggestion, found a bug, or just want to connect? Send a message below.
        </p>

        <hr />
        
        {/* Display Feedback Message */}
        {feedback && (
            <p style={{ 
                color: isSuccess ? 'green' : 'red', 
                fontWeight: 'bold', 
                textAlign: 'center',
                padding: '10px'
            }}>
                {feedback}
            </p>
        )}

        {/* Use the standardized form class */}
        <form className="standard-form" onSubmit={handleSubmit}>
            
            {/* 1. First Name Field */}
            <label htmlFor="firstName">First Name (Required):</label>
            <input 
              type="text" 
              id="firstName" 
              name="firstName" 
              value={formData.firstName}
              onChange={handleChange}
              required 
            />

            {/* 2. Last Name Field (Now explicitly required) */}
            <label htmlFor="lastName">Last Name (Required):</label>
            <input 
              type="text" 
              id="lastName" 
              name="lastName" 
              value={formData.lastName}
              onChange={handleChange}
              required // Key addition for last name requirement
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
            ></textarea>

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
    </>
  );
}