const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        nick: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        admin: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

module.exports = model("User", schema);
