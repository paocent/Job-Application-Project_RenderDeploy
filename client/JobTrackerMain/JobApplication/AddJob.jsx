// src/components/AddJob.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../../lib/auth-helper.js';
import '../css/generalCss.css';

export default function AddJob() {
    const navigate = useNavigate();
    
    // 🔑 Retrieve the authenticated object/false status
    const isAuthenticated = auth.isAuthenticated(); 

    const [formData, setFormData] = useState({
        company: '',
        role: '',
        status: 'Applied', 
        appliedDate: new Date().toISOString().substring(0, 10), 
        link: '',
        notes: ''
    });

    const [feedback, setFeedback] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const jobStatuses = ['Applied', 'Pending', 'Interviewing', 'Offer', 'Rejected'];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFeedback('Submitting application...');
        
        // Final check based on the auth helper status
        if (!isAuthenticated) { 
            setFeedback('Authentication required. Please sign in.');
            setIsSuccess(false);
            return;
        }

        try {
            const response = await fetch('/api/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 🔑 Sends the correct token from the helper object
                    'Authorization': 'Bearer ' + isAuthenticated.token, 
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFeedback('Application added successfully! Redirecting to Dashboard...');
                setIsSuccess(true);
                setTimeout(() => {
                    navigate('/dashboard'); 
                }, 1500); 

            } else {
                const errorData = await response.json();
                
                if (response.status === 401 || response.status === 403) {
                    // Token expired or invalid signature - clear session and redirect
                    auth.clearJWT(() => navigate('/signin'));
                    setFeedback('Session expired/invalid. Please sign in again.');
                } else {
                    setFeedback(`Failed to add application: ${errorData.error || response.statusText}`);
                }
                setIsSuccess(false);
            }
        } catch (error) {
            console.error('Error submitting job:', error);
            setFeedback('A network error occurred.');
            setIsSuccess(false);
        }
    };

    return (
        <div className="form-container">
            <h1 className="header">➕ Add New Application</h1>

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

            <form className="standard-form" onSubmit={handleSubmit}>
                
                <label htmlFor="company">Company Name (Required):</label>
                <input 
                    type="text" id="company" name="company" value={formData.company}
                    onChange={handleChange} required 
                />

                <label htmlFor="role">Job Role/Title (Required):</label>
                <input 
                    type="text" id="role" name="role" value={formData.role}
                    onChange={handleChange} required 
                />
                
                <label htmlFor="status">Status:</label>
                <select 
                    id="status" name="status" value={formData.status}
                    onChange={handleChange} required
                >
                    {jobStatuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>

                <label htmlFor="appliedDate">Date Applied:</label>
                <input 
                    type="date" id="appliedDate" name="appliedDate"
                    value={formData.appliedDate} onChange={handleChange}
                />
                
                <label htmlFor="link">Job Posting Link (URL):</label>
                <input 
                    type="url" id="link" name="link" value={formData.link}
                    onChange={handleChange}
                />

                <label htmlFor="notes">Notes/Feedback:</label>
                <textarea 
                    id="notes" name="notes" value={formData.notes}
                    onChange={handleChange}
                ></textarea>

                <button type="submit">Submit Application</button>
                <button 
                    type="button" 
                    onClick={() => navigate('/dashboard')}
                    style={{ backgroundColor: '#888', marginTop: '10px' }}
                >
                    Cancel / Back to Dashboard
                </button>
            </form>
        </div>
    );
}