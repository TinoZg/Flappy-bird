const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const uri = `mongodb+srv://tino:${process.env.PASSWORD}@cluster.dhhs3yx.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// The database to use
const dbName = 'game';

async function run() {
  try {
    await client.connect();
    console.log('Connected to server.');
    const db = client.db(dbName);

    // Use the collection users
    const col = db.collection('users');

    // Construct a user
    let user = {
      nickname: 'test',
      score: 10,
    };

    // Insert signle document, wait for promise so we can read it back
    const p = await col.insertOne(user);
    // Find one document
    const myDoc = await col.findOne();
    // Print to the console
    console.log(myDoc);
  } catch (error) {
    console.error(err.stack);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);

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
