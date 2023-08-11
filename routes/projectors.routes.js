const express = require("express");
const router = express.Router({ mergeParams: true });
const Projector = require("../models/Projector")

router.get("/", async (req, res) => {
    try {
        const list = await Projector.find();
        res.status(200).json(list)
    } catch (error) {
        res.status(500).send({
            message: "На сервере произошла ошибка. Попробуйте позже!"
        })
    }
})




module.exports = router