import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Helper function to map the job status string to the appropriate CSS class.
 * This ensures consistency and handles capitalization.
 * @param {string} status - The status from the job object (e.g., "Offer", "Interviewing").
 * @returns {string} The corresponding CSS class for styling (e.g., "status-offer").
 */
const getStatusClass = (status) => {
    // Normalize status to lowercase for robust matching
    const normalizedStatus = status ? status.toLowerCase() : 'other';

    switch (normalizedStatus) {
        case 'applied':
        case 'submitted':
        case 'in progress':
            return 'status-applied';
        case 'interviewing':
        case 'phone screen':
        case 'technical interview':
            return 'status-interviewing';
        case 'offer':
            return 'status-offer';
        case 'rejected':
        case 'withdrawn':
            return 'status-rejected';
        default:
            return 'status-other'; // Use 'other' for everything else
    }
};


export default function ApplicationTable({ jobs }) {
    return (
        // 1. Use the main container class for the professional rounded, shadow look
        <div className="application-table-container"> 
            <h2 className='section-title'>Your Applications ({jobs.length})</h2>
            
            {jobs.length > 0 ? (
                // 2. Use the table class for alternating row colors and clean lines
                <table className="application-table"> 
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Date Applied</th>
                            <th>Actions</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((job) => (
                            <tr key={job._id}>
                                <td>{job.company}</td>
                                <td>{job.role}</td>
                                <td>
                                    {/* 3. Use the helper function and status-badge class */}
                                    <span className={`status-badge ${getStatusClass(job.status)}`}>
                                        {job.status}
                                    </span>
                                </td>
                                <td>{new Date(job.appliedDate).toLocaleDateString()}</td>
                                <td>
                                    <Link 
                                        to={`/job/${job._id}`} 
                                        className="button-link" 
                                        // Add a clean style for the action link itself
                                        style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}
                                    >
                                        View / Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                // Clean empty state message
                <div className="job-list-placeholder" style={{ padding: '30px' }}>
                    <p>You haven't added any job applications yet. Click **"Add New Application"** above to start tracking!</p>
                </div>
            )}
        </div>
    );
}