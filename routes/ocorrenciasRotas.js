require('dotenv').config();
const express = require('express');

const Ocorrencia = require('../model/ocorrencia')
const { v4: uuidv4 } = require('uuid');
const cors = require('cors'); // permite a api se comunicar com outro site

const app = express();
app.use(express.json());
app.use(cors());


app.post('/ocorrencia', async (req, res) => {
    const geometria = {type: 'Point', coordinates:[req.body.longitude, req.body.latitude]}
    const data = req.body.data
    const hora = req.body.hora
    const inserir = await Ocorrencia.create({
        id: uuidv4(),
        titulo: req.body.titulo,
        tipo: req.body.tipo,
        data: data,
        hora: hora,
        geometria: geometria
    });
    return res.status(200).json(inserir);
})

app.get('/ocorrencia', async (req, res) => {
    const lista = await Ocorrencia.findAll();
    res.send(JSON.stringify(lista));
})

const porta = process.env.API_PORT;

app.listen(porta, () => {
    console.log(`Conectado na porta ${ porta }`);
}
);