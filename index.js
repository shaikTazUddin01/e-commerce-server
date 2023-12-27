//export reqire library
const express = require('express')
const cors = require('cors')

//create a instance 
const app = express()
//port
const port = process.env.PORT || 5000

//middleware
app.use(express.json())
app.use(cors())

//run server
app.get('/', (req, res) => {
    res.send('Server is connecting')
})

app.listen(port, () => {
    console.log("the server runing port is:", port)
})