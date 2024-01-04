const { MongoClient } = require('mongodb');

let client = null;

async function connectToMongoDB() {
  const url = "mongodb+srv://ramazannasuhbey:ramazan10@cluster0.pgtgls6.mongodb.net/6dtxTonnCoJm@author0.oz7mvte.mongodb.net/?retryWrites=true&w=majority"; //'mongodb://localhost:27017';

  try {
    client = new MongoClient(url, { useNewUrlParser: true });
    await client.connect();
    console.log('Connected to MongoDB!');
    
    //client.close();
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

function getDB() {
    return client.db('mongoProject');; // Function to get the client object
  }

module.exports = { connectToMongoDB, getDB };