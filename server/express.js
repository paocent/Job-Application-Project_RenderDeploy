
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
// 1. Middleware
// ----------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());

// ----------------------------
// 2. CORS Configuration
// ----------------------------
const allowedOrigins = [
  'https://job-application-project-renderdeploy-ofv.onrender.com', // ✅ Corrected frontend URL
  'https://job-application-project-renderdeploy.onrender.com',
  'http://localhost:5173', // Local development
  "http://127.0.0.1:5173",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Allow Postman / curl
    if (!allowedOrigins.includes(origin)) {
      console.error(`CORS blocked for origin: ${origin}`);
      return callback(new Error('Not allowed by CORS'), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// ----------------------------
// 3. Routes
// ----------------------------
app.use('/api/users', authRoutes);    // **MOVE THIS FIRST: Catches /signin and /signout**
app.use('/api/users', userRoutes);    // General user routes follow
app.use('/api/contacts', contactsRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/contact-forms', contactForms);
app.use('/api/testimonials', Testimonials);
app.use('/api/jobs', AddJob);

// ----------------------------
// 4. Error Handling
// ----------------------------
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: `${err.name}: ${err.message}` });
  } else if (err) {
    console.error(err);
    res.status(400).json({ error: `${err.name}: ${err.message}` });
  }
});

// ----------------------------
// 5. Serve Frontend (Add this AFTER API routes & error handling)
// ----------------------------
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from frontend build
app.use(express.static(path.join(__dirname, '../client/dist')));

// Send index.html for all other frontend routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

export default app;
