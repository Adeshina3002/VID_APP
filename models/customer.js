const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Enter your name"]
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phoneNumber: {
        type: String,
        required: [true, "Enter your phone number"]
    }
},
    {timestamps: true}
)

module.exports = mongoose.model("Customer", customerSchema)