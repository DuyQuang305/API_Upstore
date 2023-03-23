const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql2')
const PORT = 5000
const router = require('./Routes')

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true}))

router(app)


app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:5000`);
})
