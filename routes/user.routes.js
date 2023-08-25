const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/User");
const auth = require("../middleware/auth.middleware");

router.patch("/:userId", auth, async (req, res) => {
    try {
        const { userId } = req.params;
        if (userId === req.body._id) {
            const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
                new: true
            });
            res.status(200).send(updatedUser);
        } else res.status(401).json({ message: "Unauthorized" });
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже!"
        });
    }
});
router.get("/:userId", auth, async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findOne({ _id: userId });
        res.status(200).send(user);
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже!"
        });
    }
});

module.exports = router;
