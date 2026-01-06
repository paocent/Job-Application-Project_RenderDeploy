import React from "react";
import "./src-CSS/general.css";

const jatFeatures = [
  {
    title: "Status Tracking",
    icon: "✅",
    description:
      "Effortlessly manage application lifecycle: Applied, Interviewing, Offer, or Rejected. Get clear visibility on where you stand.",
  },
  {
    title: "Data Visualization",
    icon: "📊",
    description:
      "View key metrics and summarized data in a clean dashboard. See applications over time, conversion rates, and total outreach.",
  },
  {
    title: "Secure Notes & Links",
    icon: "🔗",
    description:
      "Store interview feedback, contact details, and job posting links securely alongside each application record.",
  },
  {
    title: "User Authentication",
    icon: "🔒",
    description:
      "Protect your personal job data with secure JWT-based authentication and private user accounts.",
  },
];

export default function Services() {
  return (
    <div className="content-container">
      <h1 className="header" style={{ textAlign: "center" }}>
        🛠️ Key JAT Features
      </h1>

      <p className="text-body" style={{ textAlign: "center", marginBottom: "30px" }}>
        The Job Application Tracker (JAT) provides essential tools to streamline your job search process.
      </p>

      <div className="feature-grid">
        {jatFeatures.map((feature, index) => (
          <div key={index} className="feature-card">
            <div style={{ fontSize: "3em", marginBottom: "10px" }}>{feature.icon}</div>
            <h3 className="feature-title" style={{ color: "var(--color-accent-primary)" }}>
              {feature.title}
            </h3>
            <p style={{ color: "var(--color-text-secondary)" }}>{feature.description}</p>
          </div>
        ))}
      </div>

      <p style={{ textAlign: "center", marginTop: "30px", color: "var(--color-text-secondary)", fontStyle: "italic" }}>
        Built using the MERN stack (MongoDB, Express, React, Node.js).
      </p>
    </div>
  );
}
