import React from 'react';

export default function SummaryCards({ total, pending, interviewing, offers }) {
  const summaryData = [
    { label: "Total Applications", count: total, className: "total" },
    { label: "Active Tracking", count: pending, className: "pending" },
    { label: "Interviews Scheduled", count: interviewing, className: "interview" },
    { label: "Offers Received", count: offers, className: "offer" },
  ];

  return (
    <div className="summary-cards-container">
      {summaryData.map((item) => (
        <div key={item.label} className={`summary-card ${item.className}`}>
          <h2>{item.count}</h2>
          <p>{item.label}</p>
        </div>
      ))}
    </div>
  );
}