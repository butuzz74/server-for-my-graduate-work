const goods = require("../mock/goods.json");
const Good = require("../models/Good");
// const orders = require("../mock/order.json");
// const Order = require("../models/Order");

module.exports = async () => {
    const goodsList = await Good.find();
    if (goodsList.length !== goods.length) {
        await createInitialEntity(Good, goods);
    }

    // const orderList = await Order.find();
    // if (orderList.length !== orders.length) {
    //     await createInitialEntity(Order, orders);
    // }
};

async function createInitialEntity(Model, data) {
    await Model.collection.drop();
    return Promise.all(
        data.map(async (elem) => {
            try {
                delete elem.id;
                const newElem = new Model(elem);
                await newElem.save();
                return newElem;
            } catch (error) {
                return error;
            }
        })
    );
}
