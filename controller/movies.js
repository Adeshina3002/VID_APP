const {StatusCodes} = require("http-status-codes")
const { BadRequestError } = require("../error")
const movieSchemas = require("../models/movies")

// Fetch all genre using GET method
// route: /api/movies
const getAllMovie = async (req, res) => {
    try {
        const movies = await movieSchemas.find()

        if (movies.length === 0) {
            res.status(StatusCodes.BAD_REQUEST).json({message: "No movies found"})
            return 
        }

        // for (let i = 0; i < movies.length; i++) {
        //     await movies[i].populate("genres",{name: 1})
        // }
        res.status(StatusCodes.OK).json({ movies })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({error: error.message})
    }
}

// Fetch all genre using GET method
// route: /api/movies/:id
const getMovie = async(req, res) => {
    try {
        const { id } = req.params
        const movie = await movieSchemas.findOne({_id: id})

        if (!movie) {
            res.status(StatusCodes.NOT_FOUND).json({message: "Movie not found"})
            return 
        }

        await movie.populate("genres", { name : 1 , _id: 0})
        res.status(StatusCodes.OK).json({movie})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message: "Bad request"})
    }
}

// Fetch all genre using POST method
// route: /api/movies
const createMovie = async (req, res) => {
    try {
        const { title, numberInStock, dailyRentalRate } = req.body 

        if (!title || !numberInStock || !dailyRentalRate) {
            return res.status(StatusCodes.BAD_REQUEST).json({message: "All fields are mandatory"})
        }

        const newMovie = await movieSchemas.create({title, numberInStock, dailyRentalRate})
        res.status(StatusCodes.CREATED).json({ message: "Movie created successfully",newMovie })

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Server error"})
    }
}

// Fetch all genre using PUT method
// route: /api/movies/:id
const updateMovie = async (req, res) => {
    try {
        // request the id 
        const { id } = req.params

        if (!id) {
            res.status(StatusCodes.BAD_REQUEST).json({message: "Please provide movie ID"})
        }

        const movie = await movieSchemas.findOne({ _id : id })

        if (!movie) {
            res.status(StatusCodes.NOT_FOUND).json({message: "Movie not found"})
        }

        const {title, numberInStock, dailyRentalRate} = req.body
        const updatedMovie = await movieSchemas.updateOne({_id: movie.id}, {title, numberInStock, dailyRentalRate})

        res.status(StatusCodes.OK).json({message: "Movie updated successfully", updatedMovie})

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message: "Invalid request"})
    }
}

// Fetch all genre using DELETE method
// route: /api/movies/:id
const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params

        if (!id) {
            return res.status(StatusCodes.BAD_REQUEST).json({message: "Please provide movie ID"})
        }

        const deletedMovie = await movieSchemas.deleteOne({ _id : id })

        if (!deletedMovie) {
            res.status(StatusCodes.NOT_FOUND).json({message: "This Movie doesn't exist or might have already been deleted"})
        }

        res.status(StatusCodes.OK).json({message:  "Operaion successful"})

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Server error"})
    }
}


 
module.exports = {
    getAllMovie, 
    getMovie, 
    createMovie,
    updateMovie ,
    deleteMovie
} 

