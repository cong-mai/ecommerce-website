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

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
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