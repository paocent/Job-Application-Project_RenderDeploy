// server/express.js
import express from 'express';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

// Import routes
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
  'https://job-application-project-renderdeploy-otfv.onrender.com', // frontend deployed URL
  'http://localhost:5173', // local dev
  'http://127.0.0.1:5173',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow curl/Postman
    if (!allowedOrigins.includes(origin)) {
      console.error(`CORS blocked for origin: ${origin}`);
      return callback(new Error('Not allowed by CORS'), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// ----------------------------
// 3. API Routes
// ----------------------------
app.use('/api/users', authRoutes);       // signin, signout
app.use('/api/users', userRoutes);       // general user routes
app.use('/api/contacts', contactsRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api', contactForms);           // ✅ mounts /api/contact correctly
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
  } else {
    next();
  }
});

export default app;
