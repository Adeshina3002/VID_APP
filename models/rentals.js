const mongoose = require("mongoose")

const rentalSchema = mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie"
    },
    dateOut: {
        type: Date,
        default: Date.now()
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number
    }
},
    {timestamps: true}
)

module.exports = mongoose.model("Rentals", rentalSchema)