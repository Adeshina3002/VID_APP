const express = require ('express')
const router = express.Router()
const {getAllGenre, createGenre, getGenre, updateGenre, deleteGenre} = require("../controller/genre")

// Fetch all genre using GET method
// routes: /api/genres
router.get ('/', getAllGenre)

// Fetch a single genre using GET method
// routes: /api/v1/genres/:id
router.get ('/:id', getGenre)

// create a genre using POST method
// routes: /api/v1/genres/:movieId
router.post ('/:movieId', createGenre)

// update a genre using PUT method
// routes: /api/v1/genres/:id
router.put ('/:id', updateGenre)

// delete a genre using DELETE method
// routes: /api/v1/genres/:id
router.delete ('/:id', deleteGenre)


module.exports = router 