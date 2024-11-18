// app.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
require('dotenv').config();

// Import Routes
const rootRoutes = require('./routes/root');
const casesRoutes = require('./routes/api/cases');
const resourcesRoutes = require('./routes/api/resources');
const vaccinationRoutes = require('./routes/api/vaccination');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session Middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Routes
app.use('/', rootRoutes);
app.use('/api/covid/cases', casesRoutes);
app.use('/api/covid/resources', resourcesRoutes);
app.use('/api/covid/vaccination', vaccinationRoutes);

// Fallback Route for 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
