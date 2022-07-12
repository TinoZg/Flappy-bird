const express = require('express');
const Datastore = require('nedb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Create new database
const database = new Datastore('database.db');
// Load database in memory
database.loadDatabase();

// Start listening on port 3000
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// Serve static files (html, css, front end JavaScript) from public folder
app.use(express.static('public'));

// Make server parse incoming data as JSON, and limit input size to 1mb
app.use(express.json({ limit: '1mb' }));

// Variable to store username and score
const userData = {};

// API path to recieve username and score
app.post('/score', (request, response) => {
  if (request.body.score > 0) {
    userData.score = request.body.score;
    database.insert(request.body);
  }
  response.end();
});

// API path to get score
app.get('/score', (request, response) => {
  response.json(userData);
  response.end();
});

// API path to get leaderboard (top 5 scores)
app.get('/leaderboard', (request, response) => {
  database
    .find({})
    .sort({ score: -1 })
    .limit(5)
    .exec((err, docs) => {
      if (err) {
        console.error(err);
        response.end();
      } else {
        response.json(docs);
        response.end();
      }
    });
});
