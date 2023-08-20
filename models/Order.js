const { Schema, model } = require("mongoose");

const OrdersSchema = new Schema(
    {
        content: [
            {
                amount: {
                    type: Number
                },
                goodId: {
                    type: Schema.Types.ObjectId,
                    ref: "Good"
                }
            }
        ],
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

module.exports = model("Order", OrdersSchema);
