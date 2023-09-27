const express = require('express')
var cors = require('cors')

const app = express()

app.use(cors());
app.use(express.json())

app.get("/home", (req,res) => {
    res.json({"users": ["userUno","userDos","userTres","userCuatro"]})
})



app.listen(5001, () => {
    console.log("Server Running on Port 5001")
})