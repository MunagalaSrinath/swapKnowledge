const Skill = require("../models/Skills");
const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().populate("user", "name email");
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createSkill = async (req, res) => {
  const { title, description, level } = req.body;
  if (!title) return res.status(400).json({ message: "Title required" });
  try {
    const skill = await Skill.create({
      user: req.user._id,
      title,
      description,
      level,
    });
    res.json(skill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id).populate("user", "name");
    if (!skill) return res.status(404).json({ message: "Skill not found" });
    res.json(skill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ message: "Skill not found" });

    // Only owner can update
    if (skill.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    skill.title = req.body.title || skill.title;
    skill.description = req.body.description || skill.description;
    skill.level = req.body.level || skill.level;

    const updated = await skill.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete skill
const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ message: "Skill not found" });

    if (skill.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    await skill.deleteOne();
    res.json({ message: "Skill deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getSkills,
  createSkill,
  getSkillById,
  updateSkill,
  deleteSkill,
};
