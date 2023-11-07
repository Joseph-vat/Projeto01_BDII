require('dotenv').config();
const express = require('express');

const Ocorrencia = require('../model/ocorrencia')
const { v4: uuidv4 } = require('uuid');
const cors = require('cors'); // permite a api se comunicar com outro site

const app = express();
app.use(express.json());
app.use(cors());


app.post('/ocorrencia', async (req, res) => {
    const geometria = { type: 'Point', coordinates: [req.body.longitude, req.body.latitude] }
    const data = req.body.data
    const hora = req.body.hora
    const lat = req.body.latitude;
    const lng = req.body.longitude;
    const ocorrencia = new Ocorrencia({
        titulo: req.body.titulo,
        tipo: req.body.tipo,
        // data: new Date(data),
        // hora: new Date(hora),
        localizacao: {
            type: 'Point',
            coordinates: [lng, lat]
        }
    });

    ocorrencia.save().then((retorno) => console.log(retorno)).catch(err => console.log(err));
    
    return res.status(200).json(ocorrencia);
})

app.get('/ocorrencia', async (req, res) => {
    const lista = await Ocorrencia.find();
    res.send(JSON.stringify(lista));
})

app.delete('/ocorrencia', async (req, res) => {
    const {id} = req.body;
    console.log(id);
    const deletando = await Ocorrencia.findOneAndDelete({_id:id});
    console.log(deletando);
    res.status(201).send(JSON.stringify("Deletado com sucesso"));

})

const porta = process.env.API_PORT;

app.listen(porta, () => {
    console.log(`Conectado na porta ${porta}`);
}
);