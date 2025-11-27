import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './Layout.css';
{/* Importing a logo image from src/asset/LOGO.png */}
import logo from '../src/assets/LOGO.png';
export default function Layout() {
  return (
    <>
      <div className="wrapper">
        <header>
          <img src={logo} alt="Logo" className="logo" />
          <h1>Job Application Tracker (JAT)</h1>
          <nav>
            {/* Navigation Links with class for CSS */}
            <Link to="/" className="home">Home</Link> |
            <Link to="/about" className="about">About JAT</Link> |            
            <Link to="/project" className="project">Testimonials</Link> |
            <Link to="/contact" className="contact">Contact Us</Link>
            | <Link to="/services" className="services">Services</Link>
           
           

          </nav>
        </header>

        <hr />

        <main>
          <Outlet />
          {/* This is where the routed components will be rendered */}
        </main>

        <hr />

        <footer>
          <p>&copy; 2025 Job Application Tracker. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}


// Planned New Layout for Job Application Tracker (JAT)

// import React from 'react';
// import { Outlet, Link } from 'react-router-dom';
// import './Layout.css';
// {/* Importing a logo image from src/asset/LOGO.png */}
// import logo from '../src/assets/LOGO.png';

// export default function Layout() {
//   return (
//     <>
//       <div className="wrapper">
//         <header>
//           {/* Logo with descriptive alt text */}
//           <img src={logo} alt="JAT Logo" className="logo" />
          
//           {/* Main application title */}
//           <h1>Job Application Tracker (JAT)</h1>
//           <nav>
//             {/* Core Navigation Links for a Tracking App */}
            
//             {/* 1. Dashboard (The main view, usually the home page) */}
//             <Link to="/" className="dashboard-link">Dashboard</Link> 
//             |
//             {/* 2. Add New Application (The main action) */}
//             <Link to="/add-job" className="add-job-link">Add New Application</Link>
//             |
//             {/* 3. About the App */}
//             <Link to="/about" className="about-app-link">About JAT</Link> 
//             |
//             {/* 4. User Profile/Settings */}
//             <Link to="/profile" className="profile-link">Profile/Settings</Link>
            
//           </nav>
//         </header>

//         <hr />

//         <main>
//           <Outlet />
//           {/* This is where the specific components (Dashboard, Add Job, etc.) will be rendered */}
//         </main>

//         <hr />

//         <footer>
//           {/* Updated footer text to match the application name */}
//           <p>&copy; 2025 Job Application Tracker. All rights reserved.</p>
//         </footer>
//       </div>
//     </>
//   );
// }