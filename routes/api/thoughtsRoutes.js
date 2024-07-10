const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  upateThought,
  deleteThought,
} = require("../../controllers/thoughtsController");
const {
  createReaction,
  deleteReaction,
} = require("../../controllers/reactionsController");

// api/thoughts
router.route("/").get(getThoughts).post(createThought);

// api/thoughts/:id
router
  .route("/:id")
  .get(getSingleThought)
  .put(upateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route("/:id/reactions").post(createReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:id/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
