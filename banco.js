const { Sequelize } = require('sequelize');



const bancoDeDados = new Sequelize('projeto', 'postgres', 'postgres', {
    host: 'localhost',
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
  
  module.exports = { bancoDeDados }