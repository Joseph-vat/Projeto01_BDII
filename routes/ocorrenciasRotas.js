require('dotenv').config();
const cors = require('cors');
const express = require('express');
const { mongoose } = require('mongoose');
const Ocorrencia = require('../model/ocorrencia');

const app = express();
app.use(express.json());
app.use(cors());

const { createClient } = require('redis');

const client = createClient({
    password: 'EjjnT3EFn6qPzuICqA3R1tBsowC47J3x',
    socket: {
        host: 'redis-10850.c326.us-east-1-3.ec2.cloud.redislabs.com',
        port: 10850
    }
});

async function conectar(){
    await client.connect();
    client.on('error',err =>{
        console.log('Erro: '+err);
    });
    console.log('Conectado com o Redis');
}

conectar();

export const checkCache = (req, res, next) => {
    const cacheKey = '/ocorrencia';

    client.get(cacheKey, (err, data) => {
        if (err) throw err;

        if (data !== null) {
            req.cacheData = JSON.parse(data);
        }

        next();
    });
};

app.post('/ocorrencia', async (req, res) => {
    const { latitude, longitude, titulo, tipo, dataHora } = req.body;
    const ocorrencia = new Ocorrencia({
        titulo,
        tipo,
        dataHora,
        localizacao: {
            type: 'Point',
            coordinates: [longitude, latitude],
        },
    });

    try {
        await ocorrencia.save();
        console.log('Ocorrência salva no MongoDB:', ocorrencia);

        // Salvar novo dado no cache
        const lista = await Ocorrencia.find();
        console.log(JSON.stringify(lista));
        const cacheKey = '/ocorrencia';
        client.setEx(cacheKey, 60, JSON.stringify(lista));
        // client.get(cacheKey, (data) => {

        //     req.cacheData = data;
        //     console.log(data);
        // })

        res.status(200).json(ocorrencia);
    } catch (err) {
        console.error('Erro ao salvar a ocorrência no MongoDB:', err);
        res.status(500).json({ error: 'Erro ao salvar a ocorrência no MongoDB' });
    }
});

app.get('/ocorrencia', checkCache, async (req, res) => {
    try {
        if (req.cacheData) {
            console.log('Dados do cache disponíveis na rota:', req.cacheData);
            return res.json(req.cacheData);
        }

        const lista = await Ocorrencia.find();

        // Atualizar o cache com os dados do MongoDB
        const cacheKey = '/ocorrencia';
        client.setEx(cacheKey, 60, JSON.stringify(lista));

        res.json(lista);
    } catch (err) {
        console.error('Erro ao buscar dados do MongoDB:', err);
        res.status(500).json({ error: 'Erro ao buscar dados do MongoDB' });
    }
});

app.delete('/ocorrencia', async (req, res) => {
    const { id } = req.body;
    const deletando = await Ocorrencia.findOneAndDelete({ _id: id });

    // Invalidar o cache relacionado após a exclusão
    const cacheKey = '/ocorrencia';
    client.del(cacheKey);

    res.status(201).json({ message: 'Deletado com sucesso' });
});

app.put('/ocorrencia', async (req, res) => {
    const { dataHora, latitude, longitude, titulo, tipo, id } = req.body;

    try {
        const edite = await Ocorrencia.updateOne(
            { _id: id },
            {
                $set: {
                    titulo: titulo,
                    tipo: tipo,
                    dataHora: dataHora,
                    localizacao: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                },
            }
        );

        // Invalidar o cache relacionado após a atualização
        const cacheKey = '/ocorrencia';
        client.del(cacheKey);

        res.status(200).json({ message: 'Atualizado com sucesso' });
    } catch (err) {
        console.error('Erro ao atualizar a ocorrência no MongoDB:', err);
        res.status(500).json({ error: 'Erro ao atualizar a ocorrência no MongoDB' });
    }
});

const porta = process.env.API_PORT;
app.listen(porta, () => {
    console.log(`Conectado na porta ${porta}`);
});
