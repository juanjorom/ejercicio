require('dotenv').config();

const db_user = process.env.DB_USER
const db_pass = process.env.DB_PASSWORD
const db_host = process.env.DB_HOST
const db_database = process.env.DB_DATABASE

const uri = `mongodb+srv://${db_user}:${db_pass}@${db_host}/${db_database}?retryWrites=true&w=majority`
const { MongoClient, ServerApiVersion } = require('mongodb');
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function test(d) {
    try {
      // Connect the client to the server
      await client.connect();
      // Establish and verify connection
      await client.db(db_database).command({ ping: 1 });
      console.log("Connected successfully to server");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
}

async function insert(schema, document) {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    const collection = client.db(db_database);
    await collection.collection(schema).insertOne(document);
    console.log("Document Inserted");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function getCollection(schema){
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    const collection = client.db(db_database).collection(schema).find({});
    var result = []
    while (await collection.hasNext()){
      var valor = await collection.next();
      result.push(valor)
    }
    return result;    
    
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

module.exports = {test, insert, getCollection};