const mongoose = require("mongoose");
const { Thought } = require("../models");

module.exports = {
  async createReaction(req, res) {
    try {
      const thoughtId = req.params.id;
      const reaction = await Thought.findByIdAndUpdate(
        thoughtId,
        {
          $push: {
            reactions: {
              ...req.body,
              reactionId: new mongoose.Types.ObjectId(),
            },
          },
        },
        { new: true }
      );
      if (!reaction) {
        return res.status(404).json({ message: "Thought not found" });
      }
      res.json({ message: "Reaction created", data: reaction });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  async deleteReaction(req, res) {
    try {
      const thoughtId = req.params.id;
      const reactionID = req.params.reactionId;
      const thought = await Thought.findOne({
        _id: thoughtId,
        reactions: { $elemMatch: { reactionId: reactionID } },
      });
      if(!thought){
        return res.status(404).json({message: 'Reaction not found'});
      }

      const reactionToDelete = await Thought.findByIdAndUpdate(
        thoughtId,
        { $pull: { reactions: { reactionId: reactionID } } },
        { new: true }
      );

      res.json({message: 'Reaction deleted', data: reactionToDelete});
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
