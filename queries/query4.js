import { MongoClient } from "mongodb";

const client = await MongoClient.connect("mongodb://localhost:27017/");
const db = client.db("project2");
const collection = db.collection("players");


// Updates the school of a player
async function updateSchool(playerName, newSchool) {
  const filter = { name: playerName };
  const updateDoc = {
    $set: {
      "school.0.name": newSchool,
    },
  };

  const result = await collection.updateOne(filter, updateDoc);
  console.log(`${result.modifiedCount} document updated`);

  await client.close();
}

updateSchool("Estevan Janjic", "Hintz Group");
