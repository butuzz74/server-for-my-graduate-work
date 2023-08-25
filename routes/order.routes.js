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
        const goodsList = await getGoodForOrderList(list);         

        async function getGoodForOrderList(arr) {
            return Promise.all(
                arr.map(async (el) => {
                    return Promise.all(
                        el.content.map(async (ul) => {
                            try {                                                             
                                const good = await Good.findById(ul._id);                                
                                return {amount: ul.amount, ...good._doc};
                            } catch (error) {
                                return error;
                            }
                        })
                    );
                })
            );
        }
        const getOrderListUser = async () => {
            const orderListUser = goodsList.map((el, index) => ({
                content: el,
                totalPriceOrder: list[index].totalPriceOrder,
                time: list[index].createdAt,
                _id: list[index]._id
            }));
            return orderListUser;
        };
        const orderListUser = await getOrderListUser();        
       
        res.status(200).send(orderListUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже!"
        });
    }
});

module.exports = router;
