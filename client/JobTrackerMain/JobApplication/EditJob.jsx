// src/components/EditJob.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import auth from '../../lib/auth-helper.js'; // Adjust path
import '../css/generalCss.css'; 
import '../css/EditJob.css';
import DeleteJob from './DeleteJob.jsx'; 
import { format } from 'date-fns';

export default function EditJob() {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const isAuthenticated = auth.isAuthenticated(); 

    const [formData, setFormData] = useState({
        company: '', 
        role: '', 
        status: 'Applied', 
        appliedDate: '', 
        link: '', 
        notes: ''
    });
    const [loading, setLoading] = useState(true);
    const [feedback, setFeedback] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const jobStatuses = ['Applied', 'Pending', 'Interviewing', 'Offer', 'Rejected'];

    // --- Data Fetch (Read) ---
    useEffect(() => {
        if (!isAuthenticated) {
            setFeedback('Authentication required.');
            setLoading(false);
            return;
        }
        
        // Helper function to handle the fetch
        const fetchJobData = async () => {
            try {
                const response = await fetch(`/api/jobs/${jobId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + isAuthenticated.token,
                    }
                });
                
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                
                // Format date for the HTML 'date' input field (yyyy-MM-dd)
                const dateOnly = data.appliedDate ? format(new Date(data.appliedDate), 'yyyy-MM-dd') : '';
                
                setFormData({
                    company: data.company || '', 
                    role: data.role || '', 
                    status: data.status || 'Applied', 
                    appliedDate: dateOnly, 
                    link: data.link || '', 
                    notes: data.notes || ''
                });
                setLoading(false);
            } catch (err) {
                setFeedback(`Error loading job: ${err.message}`);
                setLoading(false);
                if (err.message.includes('403') || err.message.includes('401')) {
                    auth.clearJWT(() => navigate('/signin'));
                }
            }
        };

        fetchJobData();

    // 🔑 FIX: Only depend on jobId. Removed 'isAuthenticated' and 'navigate' 
    // to prevent the fetch from re-running and overwriting the user's input 
    // when the component re-renders.
    }, [jobId]); 


    // --- Form Handlers ---
    const handleChange = (e) => {
        // This logic is correct and remains the standard way to update state
        setFormData({ 
            ...formData, 
            [e.target.name]: e.target.value 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFeedback('Updating application...');

        try {
            const response = await fetch(`/api/jobs/${jobId}`, { 
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + isAuthenticated.token,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFeedback('Application updated successfully! Redirecting...');
                setIsSuccess(true);
                setTimeout(() => navigate('/dashboard'), 1500);
            } else {
                const errorData = await response.json();
                if (response.status === 401 || response.status === 403) {
                    auth.clearJWT(() => navigate('/signin'));
                    setFeedback('Session expired. Please sign in again.');
                } else {
                    setFeedback(`Update failed: ${errorData.error || response.statusText}`);
                }
                setIsSuccess(false);
            }
        } catch (error) {
            setFeedback('A network error occurred.');
            setIsSuccess(false);
        }
    };

    if (loading) return <div className="content-container"><p>Loading application details...</p></div>;
    
    if (feedback.includes('not authorized to read')) {
        return <div className="content-container"><p style={{ color: 'red' }}>Access Denied: You do not own this job application.</p></div>;
    }
    if (!isAuthenticated) return <div className="content-container"><p style={{ color: 'red' }}>Access Denied. Please sign in.</p></div>;

    return (
        <div className="form-container">
            <h1 className="header">✏️ Edit Application: {formData.company}</h1>

            {feedback && <p style={{ color: isSuccess ? 'green' : 'red', fontWeight: 'bold' }}>{feedback}</p>}

            <form className="standard-form" onSubmit={handleSubmit}>
                <label htmlFor="company">Company Name (Required):</label>
                <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} required />
                
                <label htmlFor="role">Job Role/Title (Required):</label>
                <input type="text" id="role" name="role" value={formData.role} onChange={handleChange} required />
                
                <label htmlFor="status">Status:</label>
                <select id="status" name="status" value={formData.status} onChange={handleChange} required>
                    {jobStatuses.map(status => <option key={status} value={status}>{status}</option>)}
                </select>

                <label htmlFor="appliedDate">Date Applied:</label>
                <input type="date" id="appliedDate" name="appliedDate" value={formData.appliedDate} onChange={handleChange} />
                
                <label htmlFor="link">Job Posting Link (URL):</label>
                <input type="url" id="link" name="link" value={formData.link} onChange={handleChange} />

                <label htmlFor="notes">Notes/Feedback:</label>
                <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange}></textarea>
                
                <button type="submit" disabled={!isAuthenticated}>Save Changes</button>
            </form>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <button 
                    type="button" 
                    onClick={() => navigate('/dashboard')} 
                    style={{ backgroundColor: '#888', flexGrow: 1, marginRight: '10px' }}
                >
                    Cancel / Back to Dashboard
                </button>
                <DeleteJob jobId={jobId} />
            </div>
        </div>
    );
}