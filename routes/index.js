const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const express = require('express');
const router = express.Router();

router.get('/', async function(req, res, next) {
  const selectedMonth = req.query.month; // future feature? more time specific
  
  const url = `https://data.cityofnewyork.us/resource/erm2-nwe9.json?$limit=1000&$order=created_date DESC&$select=created_date,complaint_type,incident_zip,borough,latitude,longitude`;

  console.log("Fetching from URL:", url);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      // handles http errors from 311 api (404, 500, etc)
      const text = await response.text();
      console.error("Non-OK response text:", text);
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      console.error("API did not return an array:", data);
      throw new Error("Unexpected data format from API");
    }

    console.log(`Successfully fetched ${data.length} complaints`);
    res.render('index', {
      complaints: data
    });

  } catch (err) {
    console.error("Error fetching/rendering complaints:", err);
    res.render('error', {
      message: 'API fetch failed or returned invalid data',
      error: err
    });
  }
});

module.exports = router;
