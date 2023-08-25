const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        brand: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        model: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        image: {
            type: String
        },
        brightness: {
            type: String,  
        },
        category: {
            type: String,
        },
        access: {
            type: String,
        }

    },
    { timestamps: true }
);

module.exports = model("Good", schema);
