const { Sequelize, DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const bancoDeDados = new Sequelize('projeto', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres'
});

async function conectar() {
  try {
    await bancoDeDados.authenticate();
    console.log('Conectado com sucesso!');
  } catch (error) {
    console.error('A conexão fallhou :(', error);
  }
}

conectar();

const Ocorrencia = bancoDeDados.define('Ocorrencia', {
  id:{
    type:DataTypes.UUID,
    defaultValue: DataTypes.UUID,
    primaryKey: true
  },

  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


async function sincronizar() {
  await Ponto.sync();
  console.log("Sincronizando");
}

sincronizar();