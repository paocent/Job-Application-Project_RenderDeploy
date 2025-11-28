import React, { useState, useEffect } from 'react';
import '../src/src-CSS/general.css';

const API_URL = import.meta.env.VITE_API_URL; // Backend URL

// ⚠️ API Helper Function for Fetching Testimonials
const listTestimonials = async () => {
  try {
    const response = await fetch(`${API_URL}/api/testimonials`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      credentials: 'include'
    });

    if (!response.ok) {
      let errMsg = `HTTP error! status: ${response.status}`;
      try {
        const errData = await response.json();
        errMsg = errData.error || errMsg;
      } catch {}
      throw new Error(errMsg);
    }

    return await response.json();

  } catch (error) {
    console.error('Failed to fetch testimonials:', error);
    return { error: error.message || 'Could not load testimonials', data: [] };
  }
};


// Helper to render star rating 
const renderRating = (num) => '⭐'.repeat(num);

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTestimonials = async () => {
            setLoading(true);
            const data = await listTestimonials(); 

            if (data.error) {
                setError(data.error);
                setTestimonials([]);
            } else {
                setTestimonials(data);
            }
            setLoading(false);
        };

        fetchTestimonials();
    }, []); 

    if (loading) {
        return <div className="content-container" style={{ textAlign: 'center' }}><p>Loading testimonials...</p></div>;
    }

    if (error) {
        return <div className="content-container"><p style={{ color: 'red' }}>Error loading testimonials: {error}</p></div>;
    }
    
    return (
        <div className="content-container"> 
            <h1 className="header">⭐ User Testimonials</h1>
            
            <p className="text-body" style={{ textAlign: 'center', marginBottom: '30px' }}>
                See what our users are saying about the Job Application Tracker (JAT).
            </p>

            {testimonials.length > 0 ? (
                <div className="card-grid-main"> 
                    {testimonials.map((testimonial) => (
                        <div key={testimonial._id} className="standard-card"> 
                            
                            <div style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <p style={{ fontSize: '4em', margin: 0 }}>👤</p> 
                            </div>
                            
                            <h3 style={{ color: 'var(--color-primary-accent)', marginTop: '15px' }}>{testimonial.name}</h3>
                            
                            <p style={{ fontStyle: 'italic', fontSize: '1.1em', color: 'var(--color-text-light)' }}>
                                "{testimonial.quote}"
                            </p>
                            
                            <p>{renderRating(testimonial.rating)}</p>
                            
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9em' }}>
                                — {testimonial.roleOrCompany}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p style={{ textAlign: 'center' }}>No testimonials found in the database.</p>
            )}
        </div>
    );
}
