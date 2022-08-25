const { json } = require('express');
const express = require('express');
const Datastore = require('nedb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Create new database
const database = new Datastore('.data/database.db');
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

// API path to recieve username and score
let dbWorstScore;
let numberOfScores;

app.post('/score', (request, response) => {
  // Save score to database if it's in TOP 5
  async function findLowestScoreInDB() {
    await database
      .find({})
      .sort({ score: 1 })
      .limit(5)
      .exec(function (err, docs) {
        dbWorstScore = docs[0].score;
        numberOfScores = docs.length;
      });

    if (request.body.score > 0) {
      if (request.body.score > dbWorstScore || numberOfScores < 5) {
        database.insert(request.body);
      }
    }

    response.end();
  }

  findLowestScoreInDB();
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
