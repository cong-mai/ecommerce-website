const express = require('express')
const dotenv = require('dotenv');
dotenv.config({ path: require('path').resolve(__dirname, '.env') })
const mongoose  = require('mongoose')
const routes = require('./routes')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express();
const port = process.env.PORT || 3001

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
app.use(cookieParser());

routes(app);

mongoose.connect(`${process.env.MONGO_DB}`)
    .then(() => {
      console.log("Connect Db success!");
    })
    .catch((err) =>{
      console.log(err)
    })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})