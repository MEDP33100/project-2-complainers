const fetch = require('node-fetch');

const express = require('express');
const router = express.Router(); 

router.get('/', async function(req, res, next) {
  const selectedMonth = req.query.month; 

  //nyc open data api
  let url = `https://data.cityofnewyork.us/resource/erm2-nwe9.json?$limit=1000&$order=created_date DESC&$select=created_date,complaint_type,incident_zip,borough,latitude,longitude`;

  console.log("Final API URL:", url);

  try {
    const response = await fetch(url);

    // check if the response succeeded
    if (!response.ok) {
      // if not, throw an error with response 
      throw new Error(`API request failed with status ${response.status}`);
    }

    // parses data as JSON
    const data = await response.json();

    // log length of data array for debugging
    console.log("Data fetched from API:", data.length);

    // render 'index' template, passing the fetched data to view
    res.render('index', {
      complaints: data, // pass complaint data to view template
    });

  } catch (err) {
    // if error occurs (either with fetching or processing), log it
    console.error("Error fetching data:", err);

    // render error page with message and error details
    res.render('error', {
      message: 'API fetch failed', // custom message for error page
      error: err, // error object
    });
  }
});

// export the router to be used in the main app.js file
module.exports = router;
