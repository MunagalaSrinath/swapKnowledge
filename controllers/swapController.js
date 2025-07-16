const SwapRequest = require("../models/SwapRequest");

const createSwap = async (req, res) => {
  try {
    const { toUser, offeredSkill, requestedSkill } = req.body;
    if (!toUser || !offeredSkill || !requestedSkill) {
      return res.status(400).json({ message: "All fields required" });
    }

    const swap = await SwapRequest.create({
      fromUser: req.user._id,
      toUser,
      offeredSkill,
      requestedSkill,
    });

    res.status(201).json(swap);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// const getSwaps = async (req, res) => {
//   try {
//     const swaps = await SwapRequest.find({
//       $or: [{ fromUser: req.user._id }, { toUser: req.user._id }],
//     })
//       .populate("fromUser", "name")
//       .populate("toUser", "name")
//       .populate("offeredSkill", "title")
//       .populate("requestedSkill", "title");

//     res.json(swaps);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const getSwaps = async (req, res) => {
  try {
    const swaps = await SwapRequest.find({
      $or: [{ fromUser: req.user._id }, { toUser: req.user._id }],
    })
      .populate("fromUser", "name")
      .populate("toUser", "name")
      .populate("offeredSkill", "title")
      .populate("requestedSkill", "title");

    console.log("Fetched swaps for:", req.user._id);
    console.log(swaps); // ✅ see what’s returned

    res.json(swaps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateSwap = async (req, res) => {
  try {
    const swap = await SwapRequest.findById(req.params.id);
    if (!swap) return res.status(404).json({ message: "Swap not found" });

    if (swap.toUser.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    swap.status = req.body.status || swap.status;
    await swap.save();

    res.json({ message: "Swap request updated", status: swap.status });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteSwap = async (req, res) => {
  try {
    const swap = await SwapRequest.findById(req.params.id);
    if (!swap) return res.status(404).json({ message: "Swap not found" });

    if (swap.fromUser.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await swap.deleteOne();
    res.json({ message: "Swap request deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createSwap,
  getSwaps,
  updateSwap,
  deleteSwap,
};
