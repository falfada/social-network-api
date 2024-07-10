const { Schema } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    reactionBody: { type: String, required: true, maxLength: 280 },
    username: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAt) => new Date(createdAt).toDateString(),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    _id: false,
  }
);

module.exports = {reactionSchema};
