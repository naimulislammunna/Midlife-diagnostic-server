const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

app.listen(port, () => {
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
    const usersCollection = client.db('midlife').collection('users');
    const testCollection = client.db('midlife').collection('tests');
    const bookingCollection = client.db('midlife').collection('booking');

    // Users store to DB
    app.post('/users', async (req, res) => {
      const query = req.body;
      const result = await usersCollection.insertOne(query);
      res.send(result);
    })

    app.get('/user', async (req, res) => {
      const email = req.query.email;
      const query = { email: email }
      const result = await usersCollection.findOne(query);
      res.send(result)

    })

    app.get('/users', async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);

    })

    app.get('/tests', async (req, res) => {
      const result = await testCollection.find().toArray();
      res.send(result);
    });

    app.get('/test/:id', async (req, res) => {
      const id = req.params.id;

      let query = {}
      if (id) {
        query = { _id: new ObjectId(id) }
      }

      const result = await testCollection.findOne(query);
      res.send(result);
    });

    app.post('/booking', async (req, res) => {
      const doc = req.body;
      const result = await bookingCollection.insertOne(doc)
      res.send(result);
    });

    app.get('/booking', async (req, res) => {
      const email = req.query.email;

      let query = {}
      if (email) {
        query = { email: email }
      }
      const result = await bookingCollection.find(query).toArray();
      res.send(result);
    });

    app.delete('/booking/:id', async (req, res) => {
      const id = req.params.id;

      let query = {}
      if (id) {
        query = { _id: new ObjectId(id) }
      }

      const result = await bookingCollection.deleteOne(query);
      res.send(result);
    });


  } finally {

  }
}
run().catch(console.dir);
