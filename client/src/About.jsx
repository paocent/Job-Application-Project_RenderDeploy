import React from 'react';
import '../src/src-CSS/general.css';

export default function About() {
  return (
    <>
      <div className="content-container">
        {/* Main Heading for the App */}
        <h1 className='header'>About the Job Application Tracker (JAT)</h1>
        
        <p>
          The **Job Application Tracker (JAT)** is a simple, powerful tool designed to help you conquer the job search. Built with the **MERN stack** (MongoDB, Express, React, Node.js), it provides a dedicated space to organize and manage all your career opportunities.
        </p>

        <hr />

        {/* Section on Why a User Should Use It */}
        <h2 className='header'>Why Use JAT?</h2>
        <div className="benefits-list">
          <ul>
            <li>
              **Stay Organized:** Stop juggling messy spreadsheets or lost notes. Keep all application details—company, role, dates, and contacts—in one secure dashboard.
            </li>
            <li>
              **Track Status Easily:** Quickly update the status of every job (Applied, Interviewing, Offer, Rejected) so you always know where you stand.
            </li>
            <li>
              **Never Miss a Follow-up:** Set reminders and record every interaction so you can maintain professional communication and manage your schedule effectively.
            </li>
            <li>
              **Identify What Works:** By tracking all your data, you can look back and see which types of jobs and applications lead to the most interviews, helping you focus your efforts.
            </li>
          </ul>
        </div>
        
        <hr />
        
        {/* Mission/Closing Statement */}
        <h2 className='header'>Our Mission</h2>
        <p>
          Our mission is to streamline the job search process, making it less stressful and more efficient for every job seeker. We aim to provide a user-friendly and accessible tool that empowers you to land your next role.
        </p>

        <p><center>Start tracking your success today!</center></p>
      </div>
    </>
  );
}