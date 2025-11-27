// src/components/DashboardSummary.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ApplicationTable from './JobApplication/ApplicationTable';
import SummaryCards from './SummaryCards';
import './css/DashBoard.css';
import auth from '../lib/auth-helper';

// API function to fetch the list of job applications for the logged-in user
const listJobs = async () => {
    const jwt = auth.isAuthenticated();

    if (!jwt) {
        return { error: 'Authentication token missing', jobs: [] };
    }

    try {
        const response = await fetch('/api/jobs', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + jwt.token,
            }
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            if (response.status === 401 || response.status === 403) {
                throw new Error(`Authentication error! status: ${response.status}`);
            }
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error('Failed to fetch job list:', error);
        return { error: error.message || 'Could not load jobs', jobs: [] };
    }
};


export default function DashboardSummary() {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            const data = await listJobs();

            if (data.error) {
                if (data.error.includes('401') || data.error.includes('403') || data.error.includes('token missing')) {
                    auth.clearJWT(() => navigate('/signin'));
                    setError('Session expired. Please sign in again.');
                } else {
                    setError(data.error);
                }
                setJobs([]);
            } else {
                // Ensure data is an array before setting state
                setJobs(Array.isArray(data) ? data : []);
            }
            setLoading(false);
        };

        fetchJobs();
    }, [navigate]); 

    // --- Calculate Summary Data ---
    const total = jobs.length;
    
    // Active Tracking: All jobs that are NOT a final outcome (Offer or Rejected).
    const activeTracking = jobs.filter(job => 
        job.status !== 'Offer' && 
        job.status !== 'Rejected'
    ).length;
    
    const interviewing = jobs.filter(job => job.status === 'Interviewing').length;
    const offers = jobs.filter(job => job.status === 'Offer').length;
    // ------------------------------

    if (loading) {
        return <div className="loading-state-container"><p>Loading your job tracker data...</p></div>;
    }

    if (error) {
        return <div className="error-state-container"><p style={{ color: 'red' }}>Error: {error}</p></div>;
    }


    return (
        // 1. Use a standard container class for max-width and centering
        <div className="dashboard-page-content"> 
            
            {/* Header Section */}
            <header className="dashboard-header-section">
                <h1 className='dashboard-title'>Application Tracker Dashboard</h1>
                <p className='dashboard-welcome-message'>
                    Welcome! Here's a quick look at your **job search progress**.
                </p>
            </header>
            
            {/* Quick Action Section (Moved up for better visibility) */}
            <section className="quick-actions-bar">
                <Link to="/add-job" className="button button-primary"> 
                    + **Add New Application**
                </Link>
            </section>
            
            {/* Summary Cards Section */}
            <section className="summary-section">
                <h2 className='section-title'>Progress Overview</h2>
                <SummaryCards 
                    total={total} 
                    pending={activeTracking} 
                    interviewing={interviewing} 
                    offers={offers} 
                />
            </section>

            {/* Application Table Section */}
            <section className="table-section">
                <h2 className='section-title'>Recent Applications</h2>
                <ApplicationTable jobs={jobs} />
            </section>
            
        </div>
    );
}