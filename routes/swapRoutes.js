const express = require("express");
const router = express.Router();
const {
  createSwap,
  getSwaps,
  updateSwap,
  deleteSwap,
} = require("../controllers/swapController");
const protect = require("../middleware/authMiddleware");

router.route("/").post(protect, createSwap).get(protect, getSwaps);

router.route("/:id").put(protect, updateSwap).delete(protect, deleteSwap);

module.exports = router;
