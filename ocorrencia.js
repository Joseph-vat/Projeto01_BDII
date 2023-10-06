const { Sequelize, DataTypes, UUID } = require('sequelize');
const { v4: uuidv4 } = require('uuid');


//..................... Definindo a estrutura da tabela Ocorrencia ...................
const Ocorrencia = bancoDeDados.define('Ocorrencia', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
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