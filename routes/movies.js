const express = require ('express')
const router = express.Router()
const {getAllMovie, createMovie, getMovie, updateMovie, deleteMovie} = require("../controller/movies")

// Fetch all genre using GET method
// route: /api/movies
router.get ('/', getAllMovie)

// Fetch a single genre uisng GET method
// route: /api/movies/:id
router.get ('/:id', getMovie)

// create a genre using POST method
// route: /api/movies/
router.post ('/', createMovie)

// update a genre using PUT method
// route: /api/movies/:id
router.put ('/:id', updateMovie)

// delete a genre using DELETE method
// route: /api/movies/:id
router.delete ('/:id', deleteMovie)


module.exports = router 