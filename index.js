const { Sequelize, DataTypes } = require('sequelize');

const tabela = new Sequelize('atividade', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres'
});

async function conectar() {
  try {
    await tabela.authenticate();
    console.log('ok');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

conectar();

const Usuario = tabela.define('Usuario', {
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
  await Usuario.sync();
  console.log("Sincronizando");
}

sincronizar();