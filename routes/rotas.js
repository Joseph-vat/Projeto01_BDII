const express = require('express');
const {criarOcorrencias, listarOcorrencias, atualizarOcorrencias, deletarOcorrencias} = require('../controller/ocorrenciasController')

const ocorrenciasRotas = express();
ocorrenciasRotas.use(express.json());


ocorrenciasRotas.post('/ocorrencia', criarOcorrencias);

ocorrenciasRotas.get('/ocorrencia', listarOcorrencias);

ocorrenciasRotas.put('/ocorrencia', atualizarOcorrencias);

ocorrenciasRotas.delete('/ocorrencia', deletarOcorrencias);



module.exports= ocorrenciasRotas;

