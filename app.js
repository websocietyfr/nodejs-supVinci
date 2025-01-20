const express = require('express')
const app = express()
const initRoutes = require('./routes')
// const initModels = require('./models')
require('dotenv').config()
global.UPLOAD_DIR = __dirname + '/assets/uploads/';

app.use(express.json())

initRoutes(app)

app.listen(3000, () => {
    console.log('server running on 3000')
})