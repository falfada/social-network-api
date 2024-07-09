const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  upateThought,
  deleteThought,
} = require("../../controllers/thoughtsController");

// api/thoughts
router.route("/").get(getThoughts).post(createThought);

router
  .route("/:id")
  .get(getSingleThought)
  .put(upateThought)
  .delete(deleteThought);

module.exports = router;
