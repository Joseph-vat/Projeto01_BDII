const express = require('express');
const Ocorrencia = require('./ocorrencia')
const sequelize = require('sequelize')
const { v4: uuidv4 } = require('uuid');

const cors = require('cors'); // permite a api se comunicar com outro site

const app = express();
app.use(express.json());
app.use(cors());


app.post('/ocorrencia', async (req, res) => {
    const geometria = {type: 'Point', coordinates:[req.body.longitude, req.body.latitude]}
    const data = req.body.data
    const hora = req.body.hora
    const inserir = Ocorrencia.create({
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
    console.log(lista);
    // res.send(JSON.stringify(lista));
})

app.listen(3333, () => {
    console.log("Funcionando");
}
);