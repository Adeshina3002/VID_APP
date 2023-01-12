const { application } = require('express')
const express = require ('express')

const Joi = require ('joi')

const router = express.Router()

const users = [
    {id: 1, name : "Lamido Sanusi", email : "sanusi23@gmail.com", age : 25},
    {id: 2, name : "Elvis David", email : "mighty002@gmail.com", age : 32},
    {id: 3, name : "Lamido Sanusi", email : "sanusi23@gmail.com", age : 15}
]

router.get ('/', (req, res) => {
    res.status(200).json(users)
})

router.get ('/user/:id', (req, res) => {
    const found = users.find (user => user.id === parseInt(req.params.id)) 
    if(!found) {
        res.status(404).send(`User with ID :${req.params.id} not found`)
        return
    }
    else {
        res.status(200).json(found)
    }
})

router.post ('/reg', (req, res) => {

    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        birthYear: Joi.number().integer().min(1930).required()
    })

    const result = schema.validate(req.body)

    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return
    }

    // const newUser = req.body 
    // newUser.id = users.length + 1

    const newUser = { 
       id : users.length + 1, 
       name : req.body.name,
       birthYear: req.body.birthYear,
       email: req.body.email
    }

     const getAge = (birthYear) => {
        return newUser.age = new Date ().getFullYear() - birthYear
    }

    console.log(getAge(newUser.birthYear));

    delete newUser.birthYear

    users.push(newUser)

    res.status(201).json(newUser)
})

router.put ('/user/:id', (req, res) => {
    const found = users.find (user => user.id === parseInt (req.params.id))

    if (!found) {
        res.status(404).send(`User with ID ${req.params.id} not found`)
        return
    } 

    const schema = Joi.object({
        name: Joi.string().min(6).required(), 
        birthYear: Joi.number().integer().min(1930).required(),
        email: Joi.string().email().required()
    })

    const result = schema.validate(req.body)

    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return
    }

    const updateUser = {
        id : found.id,
        name : req.body.name,
        email : req.body.email,
        birthYear : req.body.birthYear
    }

    const getAge = (birthYear) => {
        return updateUser.age = new Date ().getFullYear() - birthYear
    }

    console.log(getAge(updateUser.birthYear));

    const targetIndex = users.indexOf(found)
    console.log(targetIndex);
    
    delete updateUser.birthYear

    users.splice(targetIndex, 1, updateUser)

    res.status(200).json(updateUser)
    
})

router.delete('/user/:id', (req, res) => {

    const found = users.find(user => user.id === parseInt (req.params.id))

    if (!found) {
        res.status(404).send(`User with ID ${req.params.id} not found`)
        return
    }

    const targetIndex = users.indexOf(found)
    users.splice(targetIndex, 1)
    res.status(200).end(`User with ID ${req.params.id} successfully deleted`)
    
})


module.exports = router 