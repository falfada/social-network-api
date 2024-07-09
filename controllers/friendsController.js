const { User } = require("../models");

module.exports = {
  async addFriend(req, res) {
    try {
      const userId = req.params.id;
      const friendId = req.params.friendId;

      const user = await User.findById(userId);
      if (user.friends.includes(friendId)) {
        return res.json({ message: "Friend already added" });
      }

      const newFriend = await User.findByIdAndUpdate(
        userId,
        { $push: { friends: friendId } },
        { new: true }
      );
      if (!newFriend) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "Friend added", data: newFriend });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteFriend(req, res) {
    try {
      const userId = req.params.id;
      const friendId = req.params.friendId;
      const deleteFriend = await User.findByIdAndUpdate(
        userId,
        { $pull: { friends: friendId } },
        { new: true }
      );
      if (!deleteFriend) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "Friend deleted", data: deleteFriend });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
