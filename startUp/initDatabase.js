const projectors = require("../mock/projectors.json");
const Projector = require("../models/Projector");
const orders = require("../mock/order.json");
const Order = require("../models/Order");

module.exports = async () => {
    const projectorsList = await Projector.find();
    if (projectorsList.length !== projectors.length) {
        await createInitialEntity(Projector, projectors);
    }

    const orderList = await Order.find();
    if (orderList.length !== orders.length) {
        await createInitialEntity(Order, orders);
    }
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
