const { Sequelize } = require('sequelize');

const bancoDeDados = new Sequelize(process.env.PG_DATABASE, process.env.PG_USERNAME, process.env.PG_PASSWORD, {
    host: process.env.PG_HOST ,
    dialect: 'postgres' 
  });
  
  async function conectar() {
    try {
      await bancoDeDados.authenticate();
      console.log('Concetado com sucesso');
    } catch (error) {
      console.error('A conexão fallhou :(', error);
    }
  }
  
  conectar();
  
  module.exports = bancoDeDados;