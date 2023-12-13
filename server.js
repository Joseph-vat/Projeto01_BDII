const express = require('express');
const cors = require('cors');
const ocorrenciasRotas= require('./routes/rotas')

const app = express();
app.use(express.json());
app.use(cors());


app.use(ocorrenciasRotas);

const porta = process.env.API_PORT;
app.listen(porta, () => {
    console.log(`Conectado na porta ${porta}`);
});
