const express = require ('express')
const {getAllCustomers,createCustomer, getCustomer, updateCustomer, deleteCustomer} = require("../controller/customers")

const router = express.Router()

// Fetch all customers from the db
// routes: /api/customers/
router.get ('/', getAllCustomers)

// Fetch a single customer
// routes: /api/v1/customers/:id
router.get ('/:id', getCustomer)

//  Post a customer
// routes: /api/v1/customers/signup
router.post('/signup', createCustomer)

// Update a customer details
// routes: /api/v1/customers/:id
router.put ('/:id', updateCustomer)

// delete a customer 
// routes: /api/v1/customers/:id
router.delete('/:id', deleteCustomer)


module.exports = router 