import React from 'react';
import './src-CSS/general.css'; 

// NOTE: You can either delete the unused image imports or update them 
// with icons/images relevant to the JAT features.
// import webdev from './assets/WebDev.jpg'; 
// import uiux from './assets/UI.jpg';
// import seo from './assets/SEO-image1.jpg';
// import cc from './assets/cc.png'; 

const jatFeatures = [
    {
        title: "Status Tracking",
        icon: "✅", // Use an emoji or a font icon
        description: "Effortlessly manage application lifecycle: Applied, Interviewing, Offer, or Rejected. Get clear visibility on where you stand.",
    },
    {
        title: "Data Visualization",
        icon: "📊",
        description: "View key metrics and summarized data in a clean dashboard. See applications over time, conversion rates, and total outreach.",
    },
    {
        title: "Secure Notes & Links",
        icon: "🔗",
        description: "Store interview feedback, contact details, and job posting links securely alongside each application record.",
    },
    {
        title: "User Authentication",
        icon: "🔒",
        description: "Protect your personal job data with secure JWT-based authentication and private user accounts.",
    },
];

export default function Services() {
    return (
        <div className="content-container"> {/* Standardized container */}
            
            <h1 className="header">🛠️ Key JAT Features</h1>

            <p className="text-body" style={{ textAlign: 'center' }}>
                The Job Application Tracker (JAT) provides essential tools to streamline your job search process.
            </p>

            {/* Use the standardized grid container class */}
            <div className="feature-grid"> 
                {jatFeatures.map((feature, index) => (
                    // Use the standardized card class
                    <div key={index} className="feature-card">
                        <div style={{ fontSize: '3em', marginBottom: '10px' }}>
                            {feature.icon}
                        </div>
                        <h3 className="feature-title">{feature.title}</h3>
                        <p>{feature.description}</p>
                    </div>
                ))}
            </div>

            <p style={{ textAlign: 'center', marginTop: '30px' }}>
                <i style={{ color: 'var(--color-text-muted)' }}>
                    Built using the MERN stack (MongoDB, Express, React, Node.js).
                </i>
            </p>
        </div>
    );
}