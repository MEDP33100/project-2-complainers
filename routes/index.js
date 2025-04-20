// Node fetch import workaround for ES modules
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const express = require('express');
const router = express.Router();

// GET home page with optional ?month=YYYY-MM filter
router.get('/', async function(req, res, next) {
  const selectedMonth = req.query.month; // e.g., '2025-04'

  // calls most recent api 2025 1000(max)
  let url = `https://data.cityofnewyork.us/resource/erm2-nwe9.json?$limit=1000&$order=created_date DESC&$select=created_date,complaint_type,incident_zip,borough,latitude,longitude`;



  console.log("Final API URL:", url);

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("Data fetched from API:", data.length);
    
    res.render('index', {
      complaints: data,
      
    });
    
  } catch (err) {
    console.error(err);
    res.render('error', { message: 'API fetch failed', error: err });
  }
});

module.exports = router;
