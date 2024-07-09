const router = require("express").Router();
const {
  getUsers,
  createUser,
  updateUser,
  getSingleUser,
  deleteUser
} = require("../../controllers/userController");
const { addFriend, deleteFriend } = require("../../controllers/friendsController");

// api/users
router.route("/").get(getUsers).post(createUser);

// api/users/:id
router.route("/:id").get(getSingleUser).put(updateUser).delete(deleteUser);

// api/users/:id/friends/:friendId
router.route("/:id/friends/:friendId").post(addFriend).delete(deleteFriend);
module.exports = router;
