const { Sequelize, DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');


const BancoDeDados = new Sequelize('projeto', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres'
});

async function conectar() {
  try {
    await BancoDeDados.authenticate();
    console.log('ok');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

conectar();

const Ocorrencia = BancoDeDados.define('Ocorrencia', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  datHora: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  geometria: {
    type: DataTypes.GEOMETRY,
    
  }
});


async function sincronizar() {
  await Usuario.sync();
  console.log("Sincronizando");
}

sincronizar();