const router = require("express").Router();
const {
  getUsers,
  createUser,
  updateUser,
  getSingleUser,
} = require("../../controllers/userController");
const { addFriend } = require("../../controllers/friendsController");

// api/users
router.route("/").get(getUsers).post(createUser);

// api/users/:id
router.route("/:id").get(getSingleUser).put(updateUser);

// api/users/:id/friends/:friendId
router.route("/:id/friends/:friendId").post(addFriend);
module.exports = router;
