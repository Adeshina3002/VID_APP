const {StatusCodes} = require("http-status-codes")
const genreSchema = require("../models/genre")
const movieSchemas = require("../models/movies")
const {BadRequestError, UnauthenticatedError} = require("../error")


// fetch all genres using GET method
// routes: /api/v1/genres/
const getAllGenre = async (req, res) => { 
    try {
        const genres = await genreSchema.find().sort("name")

        if (genres.length === 0) {
           return res.status(StatusCodes.NOT_FOUND).json({message: "Not found"})
        }

        for (let i = 0; i < genres.length; i++) {
            await genres[i].populate("movies", { title: 1, _id:0 })
        }
        res.status(StatusCodes.OK).json({ genres }) 
        
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message })
    }
}

// create genre using POST method
// routes: /api/v1/genres/:movieId
const createGenre = async (req, res) => {
    try {

        // first find the movie we want to create it's genre
        const movie = await movieSchemas.findOne({_id : req.params.movieId})

        if (!movie) {
            throw new BadRequestError("Movie doesn't exist")
        }

        // if the movie exists, create the genre name
        const { name } = req.body 

        if (!name) {
            res.status(StatusCodes.BAD_REQUEST).json({message: "Please provide name of the genre"})
        }
        const createdGenre = await genreSchema.create({name, movies: movie._id})

        // adding the genre ID to the movie collection
        movie.genres.addToSet(createdGenre._id)
        movie.save()
        
        res.status(StatusCodes.CREATED).json({message: `Genre added to the ${movie.title} successfully`, createGenre})
        
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({error})
    }
}

// get a single genre using GET method
// routes: /api/v1/genres/:id
const getGenre = async (req, res) => {
    try {
        const { id } = req.params 

        if (!id) {
            return res.status(StatusCodes.BAD_REQUEST).json({message: "Please provide movie ID"})
        }

        const genre = await genreSchema.findOne({ _id : id})

        if (!genre) {
            res.status(StatusCodes.NOT_FOUND).json({message: "Genre not found"})
        }
        
        await genre.populate("movies", {title: 1})
        res.status(StatusCodes.OK).json({genre})

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Server cannot process your request at this time"})
    }
}

// update a genre using PUT method
// routes: /api/v1/genres/:id
const updateGenre = async (req, res) => {
    try {
        const { id } = req.params

        if(!id) {
            res.status(StatusCodes.BAD_REQUEST).json({message: "Please provide genre ID"})
        }

        const genre = await genreSchema.findOne({ _id:id })

        if (!genre) {
            res.status(StatusCodes.BAD_REQUEST).json({message: "The requested genre doesn't exist"})
        }

        const {name} = req.body
        await genreSchema.updateOne({_id:genre.id}, {name})

        res.status(StatusCodes.OK).json({message: "opreration successful"})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Server error"})
    }
}

// delete a genre using DELETE method
// routes: /api/v1/genres/:id
const deleteGenre = async (req, res) => {
    try {
        const {id} = req.params

        if (!id) {
            res.status(StatusCodes.BAD_REQUEST).json({message: "Please provide ID"})
        }

        const genre = await genreSchema.findOne({_id : id})
        await genreSchema.deleteOne(genre)
        res.status(StatusCodes.OK).json({message: "Opeartion successful"})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Server error"})
    }
}

module.exports = {
    getAllGenre,
    createGenre,
    getGenre,
    updateGenre,
    deleteGenre
}
