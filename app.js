const express = require ('express')
const morgan = require ('morgan')
require ('dotenv').config()
const connectDB = require("./db/connect")
const {genreRoute, customersRoute, moviesRoute, rentalsRoute} = require('./routes')

const PORT = process.env.PORT || 3000
const app = express ()

// application middleware
app.use (morgan('dev')) 
app.use (express.json())
app.use (express.urlencoded({extended : false}))

app.use('/api/v1/customers', customersRoute)
app.use('/api/v1/genres', genreRoute)
app.use('/api/v1/movies', moviesRoute)
app.use('/api/v1/rentals', rentalsRoute)

app.get ('/api/v1', (req, res) => {
    res.status(200).send("Welcome to Vid App")
})

const start = async () => {
    try {
        await connectDB(process.env.Mongo_URI)
        console.log("Connected to database.....")
        app.listen (PORT, () => {
        console.log(`Server listen on on http://localhost:${PORT}`);
    })
    } catch (error) {
        console.log("Unable to connect:", error.message);
    }
}

start()