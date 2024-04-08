import { MongoClient } from "mongodb";

const client = await MongoClient.connect("mongodb://localhost:27017/");
const db = client.db("project2");
const collection = db.collection("players");

// Finds players that are over 7 feet tall and have over 200 steals in one season
const filter = {
  $and: [
    { height: { $gte: 84 } },
    { "stats.type": "steals" },
    { "stats.count": { $gt: 200 } },
  ],
};

const cursor = collection.find(filter);
const result = await cursor.toArray();

console.log(result.length);
await client.close();
