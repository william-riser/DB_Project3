import { MongoClient } from "mongodb";

const client = await MongoClient.connect("mongodb://localhost:27017/");
const db = client.db("project2");
const collection = db.collection("players");


// Finds players that went to a specific school
const schoolName = "Hintz Group";

const filter = { "school.name": schoolName };
const cursor = collection.find(filter);

await cursor.forEach((player) => {
  console.log(`Name: ${player.name}`);
  console.log(`Age: ${player.age}`);
  console.log(`Height: ${player.height} inches`);
  console.log(`Weight: ${player.weight} lbs`);
  console.log(`Position: ${player.position.toUpperCase()}`);
  console.log(`School: ${schoolName}`);
  console.log("Stats:");
  player.stats.forEach((stat) => {
    console.log(`- Season ${stat.season}: ${stat.type} - ${stat.count}`);
  });

  console.log("-".repeat(30));
});

await client.close();
