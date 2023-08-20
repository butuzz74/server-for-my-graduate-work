const express = require("express");
const router = express.Router({ mergeParams: true });
const Order = require("../models/Order");
const Good = require("../models/Good");
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
router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const list = await Order.find({ userId: userId });
        
        const lll = await kkkk(list)
                
        async function kkkk(arr){
            return Promise.all(
                arr.map( async el => {
                    return Promise.all(
                        el.content.map(async (ul) => {
                            try {
                                const a = await Good.findById(ul._id)
                                // return { amount: ul.amount, good: a, totalPriceOrder: el.totalPriceOrder}
                                return a
                            } catch (error) {
                                return error
                            }
                        })
                        
                    )
                })

            )
        }
        const nn = async () => { const sss = await lll.map(el => ({content: el, totalPriceOrder: 678, time: 99889 }))
    return sss}
        // console.log(lll);
const hhh = await nn()
        res.status(200).send(hhh);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже!"
        });
    }
});

module.exports = router;
