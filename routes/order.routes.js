const express = require("express");
const router = express.Router({ mergeParams: true });
const Order = require("../models/Order");
const auth = require("../middleware/auth.middleware");

router.post("/", auth, async (req, res) => {
    try {
        const newOrder = await Order.create({
            ...req.body,
            userId: req.body.userId
        });
        res.status(201).send(newOrder);
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже!"
        });
    }
});
router.get("/", auth, async (req, res) => {
    try {
        const list = await Order.find({ userId: req.body.userId });
        res.status(200).send(list);
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже!"
        });
    }
});

module.exports = router;
