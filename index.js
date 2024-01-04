//export reqire library
const express = require('express')
const cors = require('cors')
// require datadase
const { MongoClient, ServerApiVersion } = require('mongodb');
//dotenv
require('dotenv').config()
//create a instance 
const app = express()
//port
const port = process.env.PORT || 5000

//middleware
app.use(express.json())
app.use(cors())


// db uri
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.25fgudl.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        const categoryCollection = client.db('E-commerce').collection('categoryList')

        const userCollection = client.db('E-commerce').collection('users')
        // post user collection
        app.post('/users', async (req, res) => {
            const user = req.body
            const result = await userCollection.insertOne(user)
            res.send(result)
            console.log(result)
        })
        //post category
        app.post('/createCategoryCollection', async (req, res) => {
            const category = req.body;
            // console.log(category)
            const result = await categoryCollection.insertOne(category);
            console.log(result)
            res.send(result)

        })
        //get category data
        app.get('/categories', async (req, res) => {
            const result = await categoryCollection.find().toArray()
            res.send(result)
            console.log(result)
        })

        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);





//run server
app.get('/', (req, res) => {
    res.send('Server is connecting')
})

app.listen(port, () => {
    console.log("the server runing port is:", port)
})