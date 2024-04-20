const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const redisClient = require('redis');
const cors = require('cors');

const redis = redisClient.createClient();
const app = express();
const port = 3001;

const url = 'mongodb://localhost:27017';
const database = 'project2';

app.use(cors());
app.use(express.json());

async function connectMongo() {
  const client = await MongoClient.connect(url);
  return client.db(database);
}

// Increase the count of a player's visits
async function updateFrequentPlayer(userId, playerId) {
  const key = `frequentlyVisited:${userId}`;
  await redis.zincrby(key, 1, JSON.stringify(playerId));
}


// Get the most frequently visited players for a user
async function getFrequentPlayers(userId) {
  const key = `frequentlyVisited:${userId}`;
  const players = await redis.ZRANGE(key, 0, -1, { reverse: true });
  return players.map((player) => JSON.parse(player));
}

// Get all players
app.get('/players', async (req, res) => {
  const db = await connectMongo();
  try {
    const players = await db.collection('players').find().toArray();
    res.json({ data: players });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    db.client.close();
  }
});

// Get player by name
app.get('/players', async (req, res) => {
  const { name } = req.query;
  const db = await connectMongo();
  try {
    const players = await db.collection('players').find({ name: { $regex: new RegExp(name, 'i') } }).toArray();
    res.json({ data: players });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    db.client.close();
  }
});

// Get player by ID
app.get('/players/:id', async (req, res) => {
  const { id } = req.params;
  const db = await connectMongo();
  try {
    const player = await db.collection('players').findOne({ _id: ObjectId(id) });
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }
    await updateFrequentPlayer(1, player._id);
    res.json({ data: player });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    db.client.close();
  }
});

// Get most frequently visited players for a user
app.get('/frequentPlayers', async (req, res) => {
  try {
    const players = await getFrequentPlayers(1);
    res.json({ data: players });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new player
app.post('/players', async (req, res) => {
  const playerData = req.body;
  const db = await connectMongo();
  try {
    const result = await db.collection('players').insertOne(playerData);
    res.json({ message: 'Player added successfully', player_id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    db.client.close();
  }
});

// Update player by ID
app.put('/players/:id', async (req, res) => {
  const { id } = req.params;
  const playerData = req.body;
  const db = await connectMongo();
  try {
    const result = await db.collection('players').updateOne({ _id: ObjectId(id) }, { $set: playerData });
    res.json({ message: 'Player updated successfully', player_id: id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    db.client.close();
  }
});

// Delete player by ID
app.delete('/players/:id', async (req, res) => {
  const { id } = req.params;
  const db = await connectMongo();
  try {
    const result = await db.collection('players').deleteOne({ _id: ObjectId(id) });
    res.json({ message: 'Player deleted successfully', player_id: id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    db.client.close();
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
