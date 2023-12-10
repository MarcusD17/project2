// createDatabase.js

const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;

const databaseUrl = 'entertainment.db';
const db = new sqlite3.Database(databaseUrl);

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static('public'));

// Define a route to render the HTML page
app.get('/', (req, res) => {
  // Query data from the database
  db.all('SELECT * FROM entertainment', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    } else {
      // Render the HTML page with the retrieved data
      res.render('index', { data: rows });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
