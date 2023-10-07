const express = require('express');
const Ocorrencia = require('./ocorrencia')

const cors = require('cors'); // permite a api se comunicar com outro site

const app = express();
app.use(express.json());
app.use(cors());


app.post('/ocorrencia', async (req, res) => {
    const ocorr = req.body;
    console.log(ocorr);

    const inserir = Ocorrencia.create(ocorr);
})

app.get('/ocorrencia', async (req, res) => {
    const lista = await Ocorrencia.findAll();
    console.log(lista);
    res.json(lista);
})

app.listen(3333, () => {
    console.log("Funcionando");
}
);