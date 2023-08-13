const { Schema, model } = require("mongoose");
// const userId = 876876767565;

// const UserSchema = new Schema({
//     [userId]: {
//         type: Schema.Types.ObjectId,
//         ref: "User"
//     }
// });
const ContentSchema = new Schema({
    amount: {
        type: Number
    },
    goodId: {
        type: Schema.Types.ObjectId,
        ref: "Projector"
    }
});

const OrderSchema = new Schema(
    {
        content: {
            type: [ContentSchema]
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        totalPriceOrder: {
            type: String
        }
    },
    { timestamps: true }
);
const OrdersSchema = new Schema({
    orders: {
        type: [OrderSchema]
    }
});

module.exports = model("Order", OrdersSchema);
