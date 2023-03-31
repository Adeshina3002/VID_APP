const mongoose = require("mongoose")

const movieSchemas = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Provide the movie title"]
    },
    genres: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genre"
    }],
    numberInStock: {
        type:Number,
        required: true
    },
    dailyRentalRate: {
        type: Number,
        required: true
    }
},
    {timestamps: true}
)

module.exports = mongoose.model("Movie", movieSchemas)