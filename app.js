const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


// static files from /public folder files
app.use(express.static(path.join(__dirname, 'public')));

// view engine for hbs files
app.set('view engine', 'hbs');

// register partials
hbs.registerPartials(path.join(__dirname, 'views/partials'));

const indexRouter = require('./routes/index');
app.use('/', indexRouter);


// for 404s
app.use((req, res) => {
  res.status(404).render('error', {
    message: 'Page Not Found',
    error: { status: 404, stack: '' },
  });
});

hbs.registerHelper('json', function(context) {
  return JSON.stringify(context);
});


hbs.registerHelper('eq', function (a, b) {
  return a === b;
});


// start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;
