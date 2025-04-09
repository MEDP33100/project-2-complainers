// Node fetch
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  
  try{
    //makes request to API limit:10
    const response = await fetch(
      'https://data.cityofnewyork.us/resource/erm2-nwe9.json?$limit=50&$select=created_date,complaint_type,incident_zip,borough,latitude,longitude'
    )

    //change response to JSON
    const data = await response.json();

    //passes the data into template to render
    res.render('index', {complaints:data});
    console.log("Data fetched from API:", data);

  }

  catch (err){
    //if error show message
    console.error(err);
    res.render('error', {message: 'API fetch failed', error:err});
  }
});

module.exports = router;
