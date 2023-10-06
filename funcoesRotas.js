const express = require('express');
const Ocorrencia = require('./ocorrencia')

const cors = require('cors'); // permite a api se comunicar com outro site



const app = express();
app.use(express.json());
app.use(cors());


app.post('/ocorrencia', async (req, res) => {
    const ocorr = req.body.nome;
    console.log("oise");
    console.log(ocorr);

    const inserir = Ocorrencia.create({ocorr});
})


app.listen(3333, () => {
    console.log("Funcionando");
}
);