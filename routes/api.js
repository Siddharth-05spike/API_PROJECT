const express = require('express');
const router = express.Router();

// In-memory storage
let data = {
    regions: {
        India: { cases: 1000000, deaths: 20000, recovered: 900000 },
        USA: { cases: 2000000, deaths: 100000, recovered: 1800000 }
    },
    resources: []
};

// Fetch region data
router.get('/covid/cases/:region', (req, res) => {
    const region = req.params.region;
    const regionData = data.regions[region];
    if (regionData) {
        res.json(regionData);
    } else {
        res.status(404).json({ error: 'Region not found' });
    }
});

// Update resources
router.post('/resources', (req, res) => {
    const { region, beds, ventilators, icu } = req.body;
    data.resources.push({ region, beds, ventilators, icu });
    res.json({ message: 'Resource added successfully' });
});

// Fetch all resources
router.get('/resources', (req, res) => {
    res.json(data.resources);
});

module.exports = router;
