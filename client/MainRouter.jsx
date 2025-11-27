// MainRouter.jsx
import React from 'react';
import './MainRouter.css';
import { Route, Routes } from 'react-router-dom';

// --------------------------------------------------------------------------
// --- 1. CORE & STATIC IMPORTS ---------------------------------------------
// --------------------------------------------------------------------------
import About from './src/about.jsx';

import Contact from './src/contact.jsx';
import Layout from './components/Layout.jsx';
import Services from './src/Services.jsx';
import Home from './components/home.jsx';
import Menu from './core/Menu.jsx';

// --------------------------------------------------------------------------
// --- 2. AUTH & USER IMPORTS -----------------------------------------------
// --------------------------------------------------------------------------
import Users from './user/Users-Menu/Users.jsx';
import Signup from './user/Signup.jsx';
import SignIn from './lib/SignIn.jsx';
import Profile from './user/Profile-Menu/Profile.jsx';
import PrivateRoute from './lib/PrivateRoute.jsx';
import EditProfile from './user/Profile-Menu/EditProfile.jsx';
import NewContacts from './user/Contacts-Menu/NewContacts.jsx';


// --------------------------------------------------------------------------
// --- 3. CRUD FEATURE IMPORTS ----------------------------------------------
// --------------------------------------------------------------------------
// JOB TRACKER
import JobTrackerMain from './JobTrackerMain/Dashboard.jsx'; // Dashboard / Job List
import AddJob from './JobTrackerMain/JobApplication/AddJob.jsx'; 
import EditJob from './JobTrackerMain/JobApplication/EditJob.jsx'; 
import Testimonials from './JobTrackerMain/Testimonials.jsx'; // Renamed Testimonials import

// CONTACTS
import MenuContacts from './user/Contacts-Menu/ListContact.jsx'; 
import EditContact from './user/Contacts-Menu/EditContacts.jsx'; 

// EDUCATION



function MainRouter() {
    return (
        <div className="container">
            {/* Menu renders outside Layout to appear on all pages */}
            <Menu /> 

            <Routes>
                {/* Layout serves as the wrapper for core content */}
                <Route path="/" element={<Layout />}> 
                    
                    {/* ---------------------------------------------------------- */}
                    {/* PUBLIC ROUTES */}
                    {/* ---------------------------------------------------------- */}
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="services" element={<Services />} /> 
                    <Route path="users" element={<Users />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="signin" element={<SignIn />} />

                    {/* Note: Project and Testimonials are duplicates in your imports. Using Testimonials. */}
                    <Route path="project" element={<Testimonials />} />
                    
                    
                    {/* ---------------------------------------------------------- */}
                    {/* 🛠️ JOB TRACKER ROUTES (FIXED AND ORGANIZED) */}
                    {/* ---------------------------------------------------------- */}
                    
                    {/* Dashboard (Job List View) */}
                    <Route path="dashboard" element={<PrivateRoute><JobTrackerMain /></PrivateRoute>} />
                    
                    {/* New Job Creation */}
                    <Route path="add-job" element={<PrivateRoute><AddJob /></PrivateRoute>} />
                    
                    {/* 🔑 FIX: Edit/View Route. Use the path '/job/:jobId' to match the Link 
                        component used in ApplicationTable.jsx, resolving "No routes matched." */}
                    <Route 
                        path="job/:jobId" 
                        element={<PrivateRoute><EditJob /></PrivateRoute>} 
                    />

                    
                    {/* ---------------------------------------------------------- */}
                    {/* 1. CONTACTS CRUD ROUTES (Unchanged from your logic) */}
                    {/* ---------------------------------------------------------- */}
                    <Route 
                        path="contacts" 
                        element={<PrivateRoute><MenuContacts /></PrivateRoute>} 
                    />
                    <Route 
                        path="contacts/edit/:contactId" 
                        element={<PrivateRoute><EditContact /></PrivateRoute>}
                    />
                    <Route 
                        path="contacts/new" 
                        element={<PrivateRoute><NewContacts /></PrivateRoute>} 
                    />

                    
                    {/* ---------------------------------------------------------- */}
                    {/* 3. USER PROFILE ROUTES (Unchanged from your logic) */}
                    {/* ---------------------------------------------------------- */}
                    <Route path="user/:userId" element={<Profile />} />
                    <Route
                        path="user/edit/:userId"
                        element={<PrivateRoute><EditProfile /></PrivateRoute>}
                    />
                    
                </Route> 
            </Routes>
        </div>
    );
};

export default MainRouter;