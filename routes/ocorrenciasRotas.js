require('dotenv').config();
const express = require('express');

const Ocorrencia = require('../model/ocorrencia')
const { v4: uuidv4 } = require('uuid');
const cors = require('cors'); // permite a api se comunicar com outro site

const app = express();
app.use(express.json());
app.use(cors());


app.post('/ocorrencia', async (req, res) => {
    const { latitude, longitude, titulo, tipo, dataHora } = req.body;
    const ocorrencia = new Ocorrencia({
        titulo,
        tipo,
        dataHora,
        localizacao: {
            type: 'Point',
            coordinates: [longitude, latitude]
        }
    });

    ocorrencia.save().then((retorno) => console.log(retorno)).catch(err => console.log(err));

    return res.status(200).json(ocorrencia);
})

app.get('/ocorrencia', async (req, res) => {
    try {
        const lista = await Ocorrencia.find();
        res.json(lista);
    } catch (err) {
        console.error('Erro ao buscar dados do MongoDB:', err);
        res.status(500).send('Erro ao buscar dados do MongoDB');
    }
})

app.delete('/ocorrencia', async (req, res) => {
    const { id } = req.body;
    const deletando = await Ocorrencia.findOneAndDelete({ _id: id });
    res.status(201).send(JSON.stringify("Deletado com sucesso"));

})

app.put('/ocorrencia', async (req, res) => {
    const { dataHora, latitude, longitude, titulo, tipo, id } = req.body
    const edite = await Ocorrencia.updateOne({ _id: id }, {
        $set: {
            titulo: titulo, tipo: tipo, dataHora: dataHora, localizacao: {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
        }
    })
    res.status(500).send('Erro');
})


const porta = process.env.API_PORT;

app.listen(porta, () => {
    console.log(`Conectado na porta ${porta}`);
}
);