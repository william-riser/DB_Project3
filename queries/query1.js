import { MongoClient } from "mongodb";
const client = await MongoClient.connect("mongodb://localhost:27017/");
const db = client.db("project2");
const collection = db.collection("players");

// Finds the average age, weight, and height of players by position
const positions = [
  {
    $group: {
      _id: "$position",
      avgAge: { $avg: "$age" },
      avgWeight: { $avg: "$weight" },
      avgHeight: { $avg: "$height" },
      count: { $sum: 1 },
    },
  },
];

const result = await collection.aggregate(positions).toArray();
console.log(result);

await client.close();
