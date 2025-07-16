const express = require("express");
const router = express.Router();
const {
  getSkills,
  createSkill,
  getSkillById,
  updateSkill,
  deleteSkill,
} = require("../controllers/skillController");
const protect = require("../middleware/authMiddleware");
router.route("/").get(protect, getSkills).post(protect, createSkill);

router
  .route("/:id")
  .get(protect, getSkillById)
  .put(protect, updateSkill)
  .delete(protect, deleteSkill);

module.exports = router;
