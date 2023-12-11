require('dotenv').config();
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

module.exports = mongoose;
