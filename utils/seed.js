const connection = require("../config/connection");
const { User, Thought } = require("../models");
const users = require("./users");
const thoughts = require("./thoughts");

connection.on("error", (err) => err);

connection.once("open", async () => {
  // Seeding users
  await User.deleteMany({});
  await User.insertMany(users);

  // Seeding thoughts
  await Thought.deleteMany({});
  const insertedThoughts = await Thought.insertMany(thoughts);

  // Assigning thoughts to users
  for (const thought of insertedThoughts) {
    await User.findOneAndUpdate(
      { username: thought.username },
      { $push: { thoughts: thought._id } },
      { new: true }
    );
  }
  console.log("Data seeded");
  process.exit(0);
});
