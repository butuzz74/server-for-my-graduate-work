const express = require("express");
const router = express.Router({ mergeParams: true });
const Good = require("../models/Good");
const auth = require("../middleware/auth.middleware");

router.get("/:path?", async (req, res) => {
    const { path } = req.params;
    try {
        if (!path) {
            const list = await Good.find({ access: "Доступен" });
            res.status(200).json(list);
        } else {
            const list = await Good.find();
            res.status(200).json(list);
        }
    } catch (error) {
        res.status(500).send({
            message: "На сервере произошла ошибка. Попробуйте позже!"
        });
    }
});
// router.get("/:path?", async (req, res) => {
//     try {
//         const list = await Good.find();
//         res.status(200).json(list);
//     } catch (error) {
//         res.status(500).send({
//             message: "На сервере произошла ошибка. Попробуйте позже!"
//         });
//     }
// });
router.post("/", auth, async (req, res) => {
    try {
        const newGood = await Good.create({ ...req.body });
        res.status(201).send(newGood);
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже!"
        });
    }
});
router.patch("/:userId", auth, async (req, res) => {
    try {
        const { userId } = req.params;
        if (userId === req.body._id) {
            const updatedGood = await Good.findByIdAndUpdate(userId, req.body, {
                new: true
            });
            res.status(200).send(updatedGood);
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже!"
        });
    }
});

router.delete("/:userId", auth, async (req, res) => {
    try {
        const { userId } = req.params;
        await Good.deleteOne({ _id: userId });
        res.send(null);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});
module.exports = router;
