import React from 'react';
import '../src/src-CSS/general.css';

export default function Home() {
return (
  <>
    <div className="content-container">
      {/* Changed the title to reflect the project name */}
      <h1 className='header'>Job Application Tracker (JAT)</h1>
      
      {/* Clear welcome message and purpose */}
      <p>
        Welcome to **JAT**! This is your personal dashboard for managing your job search.
      </p>
      
      {/* Explanation of key features */}
      <p>
        Tired of spreadsheets? JAT helps you keep track of every application, interview, and follow-up in one simple place.
      </p>
      
      {/* Call to action (what users should do next) */}
      <div className="features-list">
        <h2>What you can do here:</h2>
        <ul>
          <li>**Add new applications** and save key details like company, role, and date applied.</li>
          <li>**Update the status** of your applications (e.g., Applied, Interviewing, Offer Received).</li>
          <li>**Set reminders** for follow-ups and interview dates.</li>
          <li>**View your progress** with easy-to-read summaries and statistics.</li>
          <li>**Organize your job search** all in one place!</li>
          <li>**Get started now** by adding your first job application!           
          </li>
          <li>Need help? Check out the **Help** section for tips on using JAT effectively.</li>
        </ul>
      </div>
      
      {/* Footer/closing statement */}
      <p>
        Get organized and land your next role faster!
      </p>
    </div>
  </>
);
}