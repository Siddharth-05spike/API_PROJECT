const express = require('express');
const router = express.Router();

// Render the home page
router.get('/', (req, res) => {
    res.render('index', { title: 'COVID-19 Tracker' });
});

// Render the resources page
router.get('/resources', (req, res) => {
    res.render('resources', { title: 'Hospital Resources' });
});

// Render the cases page
router.get('/cases', (req, res) => {
    res.render('cases', { title: 'COVID-19 Cases' });
});

module.exports = router;
