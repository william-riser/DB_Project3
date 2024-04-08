import { MongoClient } from "mongodb";

const client = await MongoClient.connect("mongodb://localhost:27017/");
const db = client.db("project2");
const collection = db.collection("players");


// Finds the top 10 tallest players between 200 and 220 pounds
const players = [
  {
    $match: {
      weight: { $gte: 200, $lte: 220 },
    },
  },

  { $sort: { height: -1 } },
  { $limit: 10 },
  {
    $project: {
      _id: 0,
      name: 1,
      height: 1,
      age: 1,
      weight: 1,
      position: 1,
      school: { $arrayElemAt: ["$school.name", 0] },
    },
  },
];

const cursor = collection.aggregate(players);
const result = await cursor.toArray();

result.forEach((player, index) => {
  console.log(`Player ${index + 1}:`);
  console.log(`Name: ${player.name}`);
  console.log(`Height: ${player.height}`);
  console.log(`Age: ${player.age}`);
  console.log(`Weight: ${player.weight}`);
  console.log(`Position: ${player.position}`);
  console.log(`School: ${player.school}`);
  console.log("-".repeat(30));
});

await client.close();
