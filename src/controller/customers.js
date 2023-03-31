const customerSchema = require("../models/customer")
const {StatusCodes} = require("http-status-codes")
const userSchema = require("../schemas/schema")
const { BadRequestError, UnauthenticatedError } = require("../error")


// Fetch all customers using GET method
// routes: /api/customers/
const getAllCustomers = async (req, res) => {
    try {

       const customers = await customerSchema.find().sort("name")
    
       if (!customers) {
        res.status(StatusCodes.NOT_FOUND).json({ message: "Customers not found"})
        return 
       }

       res.status(StatusCodes.OK).json({customers})

    } catch (error) {
       res.status(StatusCodes.BAD_REQUEST).json({ error: error.message})
    }
 }


// create a Customer using a POST method
// routes: /api/customers/signup
const createCustomer = async (req, res, next) => {
    try {
       const { name, isGold, phoneNumber } = req.body

    // validating user input using Joi library
        const result = userSchema(req.body)

    // if there is error with parse data from the customer
    if (result.error) {
        // console.log(result.error);
        return res.status(StatusCodes.BAD_REQUEST).send(result.error.details[0].message)
    }

    const numberExists = await customerSchema.findOne({ phoneNumber })

    if (numberExists) {
       return next(new BadRequestError("Number already exists, please provide another number"))
    } 

    const customer = await customerSchema.create({ name, isGold, phoneNumber })
    res.status(StatusCodes.CREATED).json({customer})

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error })
    }
}

// Fetch a single Customer using GET method
// routes: /api/customers/:id
const getCustomer = async (req, res) => {
    try {
        const { id } = req.params
        
        // check if the id was specified from the customer
        if (!id) {
            throw new BadRequestError("Please provide your ID")
        }

        // check if the customer's ID exists in the database
        const customer = await customerSchema.findById({_id : id})
        
        if (!customer) {
            throw new BadRequestError(`No customer with ID: ${req.params.id} exists`);
          }
        
        res.status(StatusCodes.OK).json({ customer })

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message})
    }
}

// Update customer details using PUT method
// routes: /api/customers/:id
const updateCustomer = async (req, res) => {
    try {
        // check if the customer ID was provided
        const { id } = req.params

        if (!id) {
            return new BadRequestError("Please provide your ID")
        }

        // check if the provided ID exist in our Database
        const customer = await customerSchema.findOne({ _id: id }) 

        if (!customer) {
            return new BadRequestError(`No customer with ID ${req.params.id} exists`)
        }

        // If the customer exists, then proceed to validate the customer input
        const {name, isGold, phoneNumber} = req.body 

        const result = userSchema(req.body) 
        
        if (result.error) {
            res.status(StatusCodes.BAD_REQUEST).send(result.error.details[0].message) 
        }

        const updateDetails = await customerSchema.updateOne({_id: customer.id},{name, isGold, phoneNumber})

        res.status(StatusCodes.OK).json({message: "Customer data updated successfully", updateDetails})

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error })
    }
}

// delete customer info using DELETE method
// routes: /api/customers/:id
const deleteCustomer = async (req, res) => {

    try {
        const { id } = req.params

        if (!id) {
            throw new BadRequestError("Please provide your ID")
        }

        const customer = await customerSchema.deleteOne({_id: id})

        if (!customer) {
            throw new BadRequestError("No such customer exists")
        }
        
        res.status(StatusCodes.OK).json({message: "Data deleted successfully"})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error })
    }
}

module.exports = {
    getAllCustomers,
    createCustomer,
    getCustomer,
    updateCustomer,
    deleteCustomer
}