const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost:27017'; // Replace with your MongoDB connection string

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files (like stylesheets)
app.use(express.static('public'));

// Set up a route to render the documentation page
app.get('/documentation', (req, res) => {
  const indexPath = path.join(__dirname, 'views', 'index.html');
  res.sendFile(indexPath);
});

// Set up a route for the root path to redirect to the documentation page
app.get('/', (req, res) => {
  res.redirect('/documentation');
});

// Set up a route to serve sidebar HTML files
app.get('/sidebar/:filename', (req, res) => {
  const filename = req.params.filename;
  const sidebarPath = path.join(__dirname, 'views', 'sidebar', `${filename}.html`);

  res.sendFile(sidebarPath, (err) => {
    if (err) {
      // Handle file not found error (404)
      res.status(404).send('File not found');
    }
  });
});
// Set up a route to serve views HTML files
app.get('/views/:filename', (req, res) => {
  const filename = req.params.filename;
  const viewsPath = path.join(__dirname, 'views', `${filename}.html`);

  res.sendFile(viewsPath, (err) => {
    if (err) {
      // Handle file not found error (404)
      res.status(404).send('File not found');
    }
  });
});
// Set up a route to handle form submissions
app.post('/submit', (req, res) => {
  const formData = req.body;

  // Connect to MongoDB and insert the data
  MongoClient.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.error('Error connecting to MongoDB:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    const db = client.db('your_database_name'); // Replace with your database name
    const collection = db.collection('your_collection_name'); // Replace with your collection name

    // Insert the form data into the MongoDB collection
    collection.insertOne(formData, (insertErr, result) => {
      if (insertErr) {
        console.error('Error inserting data into MongoDB:', insertErr);
        res.status(500).send('Internal Server Error');
        return;
      }

      console.log('Data inserted into MongoDB:', result.ops);
      res.send('Data submitted successfully!');
      client.close(); // Close the MongoDB connection
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
