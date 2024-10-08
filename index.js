const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.port || 5000;
require('dotenv').config()

// midleware
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello i am server')
})

app.listen(port, () =>{
    console.log('server is running and port:', port);
    
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@express-explore.use1c.mongodb.net/?retryWrites=true&w=majority&appName=express-explore`;

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
    await client.connect();
    const usersCollection = client.db('midlife').collection('users')

    // Users store to DB
    app.post('/users', async(req, res)=>{
        const query = req.body;
        const result = await usersCollection.insertOne(query);
        res.send(result);
    })
    app.get('/users', async (req, res) =>{
        const email= req.query.email;
        const query = {email: email}
        const result = await usersCollection.findOne(query);
        res.send(result)
        
    })
    

  } finally {

  }
}
run().catch(console.dir);
