const { Schema, model } = require("mongoose");
const userId = 876876767565;

const UserSchema = new Schema({
    [userId]: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});
const ContentSchema = new Schema({
    amount: {
        type: Number
    },
    brand: {
        type: String
    },
    brightness: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    model: {
        type: String
    },
    price: {
        type: String
    },
    type: {
        type: String
    }
});

const OrderSchema = new Schema(
    {
        content: {
            type: [ContentSchema]
        },
        info: {
            time: {
                type: Number
            },
            totalPriceOrder: {
                type: String
            }
        }
    },
    { timestamps: true }
);
const OrdersSchema = new Schema({
    user : {
        type: [OrderSchema]
    }
});

module.exports = model("Order", OrdersSchema);
