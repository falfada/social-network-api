const connection = require("../config/connection");
const { User } = require("../models");

connection.on("error", (err) => err);

const users = [
  {
    username: "alice_wonder",
    email: "alice.wonder@email.com",
  },
  {
    username: "bob_builder",
    email: "bob.builder@email.com",
  },
  {
    username: "charlie_choco",
    email: "charlie.choco@email.com",
  },
  {
    username: "eddie_eagle",
    email: "eddie.eagle@email.com",
  },
  {
    username: "diana_prince",
    email: "diana.prince@email.com",
  },
  {
    username: "fiona_fairy",
    email: "fiona.fairyy@email.com",
  },
  {
    username: "george_giant",
    email: "george.giant@email.com",
  },
  {
    username: "hannah_hawk",
    email: "hanna.hawk@email.com",
  },
  {
    username: "ian_iceberg",
    email: "ian.iceberg@email.com",
  },
  {
    username: "julia_jewel",
    email: "julia.jewel@email.com",
  },
];

connection.once("open", async () => {
  await User.deleteMany({});
  await User.insertMany(users);
  console.log("Data seeded");
  process.exit(0);
});
