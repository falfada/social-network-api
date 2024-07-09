const connection = require("../config/connection");
const { User, Thought } = require("../models");
const users = require('./users');
const thoughts = require('./thoughts');

connection.on("error", (err) => err);

connection.once("open", async () => {
  await User.deleteMany({});
  await User.insertMany(users);
  await Thought.deleteMany({});
  await Thought.insertMany(thoughts);
  console.log("Data seeded");
  process.exit(0);
});
