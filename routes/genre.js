const express = require ('express')
const Joi = require('joi')

const router = express.Router()

const movieGenres = [
    {id: 1, name: "Action"}, {id: 2, name: "Horror"}, {id: 3, name: "Romance"}, {id: 4, name: "Comedy"}, {id: 5, name: "Drama"}, {id: 6, name: "Fantasy"}, {id: 7, name: "Crime"}, {id: 8, name: "Sports"}, {id: 9, name: "Western"}, {id: 10, name: "Mystery"}, {id: 11, name: "Thriller"}, {id: 12, name: "Sci-Fi"}, {id: 13, name: "War"}, {id: 14, name: "Animation"}
]

router.get ('/', (req, res) => {
    res.status(200).json(movieGenres)
})

router.get ('/:id', (req, res) => {
    const found = movieGenres.find (genre => genre.id === parseInt(req.params.id))

    if (!found) {
        res.status(404).send(`Movie genre with ID ${req.params.id} not found`)
        return 
    } else {
        res.status(200).json(found)
    }
})

router.get ('/type/:name', (req, res) => {
    const found = movieGenres.find(genre => genre.name.toLowerCase() == req.params.name.toLowerCase())

    if (!found) {
        res.status(404).send(`The movie with the genre ${req.params.name} not found`)
        return
    } else {
        res.status(200).json(found)
    }
})

router.post ('/', (req, res) => {

    const schema = Joi.object({
        name : Joi.string().min(3).required()
    })

    const result = schema.validate(req.body)

    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return
    }

    const newGenre = {
        id : movieGenres.length + 1,
        name : req.body.name
    }

    movieGenres.push(newGenre)
    res.status(201).json(newGenre)
})

router.put ('/:id', (req, res) => {
    const found = movieGenres.find (genre => genre.id === parseInt (req.params.id))

    if (!found) {
        res.status(404).send(`Movie genre with ID ${req.params.id} not found`)
        return
    }

    const schema = Joi.object ({
        name : Joi.string().min(3).required()
    })

    const result = schema.validate(req.body)

    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return
    }

    found.name = req.body.name
    res.send(found)
})

router.delete ('/:id', (req, res) => {
    const found = movieGenres.find (genre => genre.id === parseInt (req.params.id))

    if (found) {
        const indexCheck = movieGenres.indexOf(found)
        movieGenres.splice(indexCheck, 1)
        res.status(200).send(`Movie genre with ID ${req.params.id} successfully deleted`)
        return
    } else {
        res.status(404).send(`Movie genre with ID ${req.params.id} not found`)
    }
})


module.exports = router 