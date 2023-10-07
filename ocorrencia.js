const { Sequelize, DataTypes, UUID } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const bancoDeDados = require('./banco')


//..................... Definindo a estrutura da tabela Ocorrencia ...................
const Ocorrencia = bancoDeDados.define('Ocorrencia', {
  // id: {
  //   type: DataTypes.UUID,
  //   defaultValue: DataTypes.UUIDV4,
  //   primaryKey: true,
  // },
  nome: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nome2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // tipo: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  // datHora: {
  //   type: DataTypes.DATE,
  //   allowNull: false
  // },
  // geometria: {
  //   type: DataTypes.GEOMETRY,

  // }
});


async function sincronizar() {
  await Ocorrencia.sync();
  console.log("Sincronizando");
}

sincronizar();

module.exports = Ocorrencia;