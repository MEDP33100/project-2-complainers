const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
const port = 3000;

// static files from /public folder files
app.use(express.static(path.join(__dirname, 'public')));

// view engine for hbs files
app.set('view engine', 'hbs');

// register partials
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// sample 311 complaints for testing (real API results are generating on local server)
const complaints = [
  {
    created_date: '2025-04-15',
    complaint_type: 'Noise',
    incident_zip: '10001',
    borough: 'MANHATTAN',
    latitude: 40.748817,
    longitude: -73.985428,
  },
  {
    created_date: '2025-04-16',
    complaint_type: 'Street Condition',
    incident_zip: '10002',
    borough: 'BROOKLYN',
    latitude: 40.712776,
    longitude: -74.005974,
  },
  {
    created_date: '2025-04-17',
    complaint_type: 'Illegal Parking',
    incident_zip: '10003',
    borough: 'QUEENS',
    latitude: 40.73061,
    longitude: -73.935242,
  },
];

// map render
app.get('/', (req, res) => {
  res.render('index', {
    title: '311 Complaints',
    complaints,
  });
});

// for 404s
app.use((req, res) => {
  res.status(404).render('error', {
    message: 'Page Not Found',
    error: { status: 404, stack: '' },
  });
});

// start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
