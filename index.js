const { Sequelize, DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const express= require('express');

const app = express();
app.use(express.json());


//..................... Criando o banco  ...................
const bancoDeDados = new Sequelize('projeto', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres'
});

async function conectar() {
  try {
    await bancoDeDados.authenticate();
    console.log('ok');
  } catch (error) {
    console.error('A conexão fallhou :(', error);
  } 
}

conectar();

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
  datHora: {
    type: DataTypes.DATE,
    allowNull: false
  },
  geometria: {
    type: DataTypes.GEOMETRY,
    
  // }
});

async function sincronizar() {
  await Ocorrencia.sync();
  console.log("Sincronizando");
}

sincronizar();

const salvando = () => {
  const titulo = document.getElementById(campoDeTexto).value
  const dados = {
    nome: titulo,
    tipo: "gddh",
    datHora: "jshgd"
  }

  fetch('http://localhost:3333/ocorrencia', {
    method: 'POST',
    body: JSON.stringify(dados)
  })
}

// //..................... Criando as rotas ...................

app.post("/ocorrencia", async (req,res) => {
  const novaOcorrencia = req.body.nome
 // res.send("");
  console.log(novaOcorrencia);
});


//salvando();

app.listen(3333, () => {
  console.log("Funcionando");
}
);