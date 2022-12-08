const { application } = require('express')
const express = require ('express')

const Joi = require ('joi')

const router = express.Router()

const users = [
    
]

router.get ('/', (req, res) => {
    res.status(200).json(users)
})

router.get ('/user/:id', (req, res) => {
    const found = users.find (user => user.id === parseInt(req.params.id)) 
    if(!found) {
        res.status(404).send(`User with ID ${req.params.id} not found`)
    }
    else {
        res.status(200).json(found)
    }
})

router.post ('/reg', (req, res) => {

    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().email().required(),
        birthYear: Joi.number().integer().min(1930).required()
    })

    const result = schema.validate(req.body)

    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return
    }

    const newUser = { 
       id : users.length + 1, 
       name : req.body.name,
       birthYear: req.body.birthYear,
       email: req.body.email,
    }

    newUser.age = new Date ().getFullYear() - newUser.birthYear
    if (newUser.age >= 18) {
         newUser.age = "Above 18"
    } else {
         newUser.age = "Below 18"
    }

    users.push(newUser)
    delete newUser.birthYear
    res.status(201).json(newUser)
})

router.put ('/user/:id', (req, res) => {
    const found =users.find (user => user.id === parseInt(req.params.id))

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

    const updated = {
        id : found.id,
        name : req.body.name,
        email : req.body.email,
        birthYear : req.body.birthYear
    }

    updated.age = new Date ().getFullYear() - updated.birthYear
    if (updated.age >= 18) {
         updated.age = "Above 18"
    } else {
         updated.age = "Below 18"
    }

    const targetIndex = users.indexOf(found)
    users.splice(targetIndex, 1, updated)

    delete updated.birthYear
    res.status(201).json(updated)
    
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