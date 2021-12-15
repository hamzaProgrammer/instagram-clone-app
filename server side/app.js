const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config({path: './config.env'})
require('./db/conn')
const port = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use(cors())

app.use(express.json())
app.use(require('./routes/Routes'))
app.use(require('./routes/PostsRoutes'))


app.listen(port, (req, res) => {
    console.log(`Express Server Running at ${port}`)
})