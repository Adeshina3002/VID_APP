const express = require("express")
const { getAllRentals, getRental,createRentals, updateRental, deleteRental } = require("../controller/rentals")
const router = express.Router()


// GET ALL RENTALS
// routes: /api/rentals
router.get("/", getAllRentals)

// GET A RENTALS
// routes: /api/rentals/:id
router.get("/", getRental)

// POST A RENTAL
// routes: /api/rentals/:movieId/:customerId
router.post('/:movieId/:customerId', createRentals)

// UPDATE A RENTAL
// routes: /api/rentals/:movieId/:customerId
router.put('/:movieId/:customerId', updateRental)

// DELETE A RENTAL
// routes: /api/rentals
router.delete('/id', deleteRental)


module.exports = router