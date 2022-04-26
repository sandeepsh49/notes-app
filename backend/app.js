const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')

const app = express()

const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/notes', require('./routes/noteRoutes'))

app.use(errorHandler)

app.listen(port, () => {
    console.log(`serving on port: ${port}`)
})