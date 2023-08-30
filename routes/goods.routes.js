const express = require("express");
const router = express.Router({ mergeParams: true });
const Good = require("../models/Good");
const auth = require("../middleware/auth.middleware");

router.get("/:path?", async (req, res) => {
    const { path } = req.params;    
    try {
        if (!path) {
            const list = await Good.find({ access: "Доступен" });
            res.status(200).send(list);
        } else if (path === "cardaddgood") {
            const list = await Good.find();
            res.status(200).send(list);
        } else {
            const good = await Good.findOne({ _id: path }); 
            if(!good){
                return res.status(400).send({
                    error: {
                        message: "GOOD_NOT_FOUND",
                        code: 400
                    }
                });
            }           
            res.status(200).send(good);
        }
    } catch (error) {        
        res.status(500).send({
            message: "На сервере произошла ошибка. Попробуйте позже!"
        });
    }
});
// router.get("/:userId", async (req, res) => {
//     const { userId } = req.params;
//     console.log(userId)
//     try {
//         const good = await Good.find({ _id: userId });
//         res.status(200).json(good);
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
