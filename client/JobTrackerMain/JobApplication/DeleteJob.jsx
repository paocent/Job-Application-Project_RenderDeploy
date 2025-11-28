// src/components/DeleteJob.jsx

import React, { useState } from 'react';
import auth from '../../lib/auth-helper.js';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

export default function DeleteJob({ jobId }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();
    const isAuthenticated = auth.isAuthenticated();

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this application?")) {
            return;
        }

        setIsDeleting(true);

        try {
            const response = await fetch(`${API_URL}/api/jobs/${jobId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + isAuthenticated.token,
                    'Accept': 'application/json'
                },
                credentials: 'include'
            });

            if (response.ok) {
                navigate('/dashboard', {
                    state: { message: 'Application deleted successfully!' }
                });
            } else {
                const errorData = await response.json();
                alert(`Deletion failed: ${errorData.error || response.statusText}`);
                setIsDeleting(false);
            }
        } catch (error) {
            console.error('Error deleting job:', error);
            alert('A network error occurred during deletion.');
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting || !isAuthenticated}
            style={{ 
                backgroundColor: 'darkred', 
                color: 'white',
                flexGrow: 1,
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
            }}
        >
            {isDeleting ? 'Deleting...' : '🗑️ Delete Application'}
        </button>
    );
}
