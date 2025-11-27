import express from 'express';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import contactsRoutes from './routes/contacts.routes.js';
import projectsRoutes from './routes/project.routes.js';
import contactForms from './routes/contactsForm.routes.js';
import Testimonials from './routes/testimonial.routes.js';
import AddJob from './routes/jobApplication.routes.js';

dotenv.config();

const app = express();

// ----------------------------
// 1. Parsing Middleware
// ----------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ----------------------------
// 2. Security & Utility Middleware
// ----------------------------
app.use(compress());
app.use(helmet());

// ----------------------------
// 3. CORS Middleware (for credentials)
// ----------------------------
const allowedOrigins = [
  'https://job-application-project-renderdeploy-otfv.onrender.com', // frontend
  'http://localhost:5173' // for local dev
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow Postman, curl
    if (!allowedOrigins.includes(origin)) return callback(new Error('CORS blocked'), false);
    return callback(null, true);
  },
  credentials: true // allow cookies / credentials
}));


// ----------------------------
// 4. Route Handlers
// ----------------------------
app.use('/api/users', userRoutes);    // general user routes
app.use('/api/users', authRoutes);    // signin / signout
app.use('/api/contacts', contactsRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/contact-forms', contactForms);
app.use('/api/testimonials', Testimonials);
app.use('/api/jobs', AddJob);

// ----------------------------
// 5. Global Error Handling
// ----------------------------
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    // express-jwt auth errors
    res.status(401).json({ error: `${err.name}: ${err.message}` });
  } else if (err) {
    // General errors
    console.error(err);
    res.status(400).json({ error: `${err.name}: ${err.message}` });
  }
});

export default app;
