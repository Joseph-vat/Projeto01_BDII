require('dotenv').config();


// ------------- BANCO MONGO
const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Conectado ao Mongo");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
  }
}

connectToDatabase().catch(err => console.log(err));


// ------------- BANCO REDIS
const { createClient } = require('redis');

const client = createClient({
    password: 'EjjnT3EFn6qPzuICqA3R1tBsowC47J3x',
    socket: {
        host: 'redis-10850.c326.us-east-1-3.ec2.cloud.redislabs.com',
        port: 10850
    }
});

async function conectar() {
    await client.connect();
    client.on('error', err => {
        console.log('Erro: ' + err);
    });
    console.log('Conectado com o Redis');
}

conectar();

module.exports = {
  client: client,
  mongoose: mongoose
};
