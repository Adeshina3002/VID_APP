const express = require ('express')
const router = express.Router()
const {getAllMovie, createMovie, getMovie, updateMovie, deleteMovie} = require("../controller/movies")

// Fetch all movies using GET method
// route: /api/movies
router.get ('/', getAllMovie)

// Fetch a single movie uisng GET method
// route: /api/movies/:id
router.get ('/:id', getMovie)

// create a movie using POST method
// route: /api/movies/
router.post ('/', createMovie)

// update a movie using PUT method
// route: /api/movies/:id
router.put ('/:id', updateMovie)

// delete a movie using DELETE method
// route: /api/movies/:id
router.delete ('/:id', deleteMovie)


module.exports = router 