const { Sequelize, DataTypes, UUID } = require('sequelize');
const bancoDeDados = require('./banco')
const pgp = require('pg-promise')();


//..................... Definindo a estrutura da tabela Ocorrencia ...................
const Ocorrencia = bancoDeDados.define('Ocorrencia', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false
  },
  geometria: {
    type: DataTypes.GEOMETRY,
  }
});


async function sincronizar() {
  await Ocorrencia.sync();
  console.log("Sincronizando");
}

sincronizar();

module.exports = Ocorrencia;