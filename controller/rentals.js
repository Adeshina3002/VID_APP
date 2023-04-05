const rentalSchema = require("../models/rentals")
const customerSchema = require("../models/customer")
const movieSchemas = require("../models/movies")

const {StatusCodes} = require("http-status-codes")

// Fetch all rentals using GET method
// routes: /api/v1/rentals
 const getAllRentals = async (req, res) => {
    try {
        const rentals = await rentalSchema.find().sort("dateOut")

        if (rentals.length === 0) return res.status(StatusCodes.NOT_FOUND).json({message: "No rentals at this moment"})

        // await rentals.populate(["customer", {name: 1}], ["movie", {name: 1}])
        res.status(StatusCodes.OK).json({rentals})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Server error"})
    }
}

// Fetch a rental using GET method
// routes: /api/v1/rentals/:id
const getRental = async(req, res) => {
    try {
        const rental = await rentalSchema.findOne({_id: req.params.id})

        if (!rental) return res.status(StatusCodes.NOT_FOUND).json({message: "No record found"})

        await rental.populate("Customer", {name: 1})
        await rental.populate("Movie", {title: 1})

        res.status(StatusCodes.OK).json(rental)

       
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message: error.message})
    }
}

// CREATE a rental using POST method
// routes: /api/v1/rentals/:movieId/:customerId
const createRentals = async (req, res) => {
    try {
        const movie = await movieSchemas.findOne({_id: req.params.movieId})

        if (movie.numberInStock === 0) return res.status(StatusCodes.NOT_FOUND).json({message: "This movie is out of stock"}) 
       
        const customer = await customerSchema.findById({_id: req.params.customerId}) 

        if (!customer) {
            return res.status(StatusCodes.BAD_REQUEST).json({message: "This customer doesn't exists"})
        }

        const {dateOut, dateReturned, rentalFee } = req.body 
         
        if (!dateReturned || !rentalFee) return res.status(StatusCodes.BAD_REQUEST).json({message: "All fields are mandatory"})
        

        const rental = await rentalSchema.create({ dateOut, dateReturned, rentalFee })

        await movieSchemas.updateOne({_id: movie.id},{$inc: {numberInStock:-1, dailyRentalRate: 1}})
        
        // await rental.populate("customer", { name:1 })
        // await rental.populate("movie", {title: 1})
        
        res.status(StatusCodes.CREATED).json(rental)

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "server error"})
    }
}


// UPDATE a rental using PUT method
// routes: /api/v1/rentals
const updateRental = async (req, res) => {
    try {
        const rental = await rentalSchema.findOne({_id: req.params.id})

        if (!rental) {
            return res.status(StatusCodes.NOT_FOUND).json({message: "No rental found"})
        }

        const {movieId} = req.params
        const {customerId} = req.params

        if (!movieId || !customerId) {
            return res.status(StatusCodes.BAD_REQUEST).json({message: "All fields are mandatory"})
        }

        const {dateOut, dateReturned, rentalFee } = req.body

        if (!dateReturned || ! rentalFee) {
            return res.status(StatusCodes.BAD_REQUEST).json({message: "All fields are mandatory"})
        }

        await rentalSchema.updateOne({_id: rental.id}, {dateOut, dateReturned, rentalFee })
        res.status(StatusCodes.OK).json({message: "Data updated successfully"})

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "server error"})
    }
}

// DELETE a rental using DELETE method
// routes: /api/v1/rentals/:id
const deleteRental = async (req, res) => {
    try {
        const rental = await rentalSchema.find({_id:req.params.id})

        if (!rental) return res.status(StatusCodes.NOT_FOUND).json({message: "Rental data not found"})

        await rentalSchema.deleteOne({_id:rental.id})
        res.status(StatusCodes.OK).json({message: "Data deleted successfully"})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message: "Validation all fields"})
    }
}


module.exports = {
    getAllRentals,
    getRental,
    createRentals,
    updateRental,
    deleteRental
}