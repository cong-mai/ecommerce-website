const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const routes = require('./routes')

const createApp = () => {
    const app = express()

    const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000').split(',').map(o => o.trim())
    app.use(cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.some(o => origin === o || origin.endsWith('.vercel.app'))) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        },
        credentials: true
    }))
    app.use(bodyParser.json())
    app.use(cookieParser())

    routes(app)

    return app
}

module.exports = createApp
