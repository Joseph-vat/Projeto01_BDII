const { client, mongoose } = require('../database/banco');
const Ocorrencia = require('../model/ocorrencia');
mongoose.set('strictQuery', true);


//Função para add dados ao redis
async function addCache(cacheKey) {
    client.setEx(cacheKey, 600, JSON.stringify(await Ocorrencia.find()));
    const dados = await client.get(cacheKey);
    console.log("Salvo no redis");
    return dados;
}

export async function criarOcorrencias(req, res) {
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
        // função para salvar dados no mongo
        await ocorrencia.save();
        console.log('Ocorrência salva no MongoDB:', ocorrencia);
        // função para salvar dados no redis
        return res.json(JSON.parse(await addCache("/ocorrencia")));
    } catch (err) {
        console.error('Erro ao salvar a ocorrência no MongoDB:', err);
        res.status(500).json({ error: 'Erro ao salvar a ocorrência no MongoDB' });
    }
};

export async function listarOcorrencias(req, res) {
    try {
        const dadosCache = await client.get("/ocorrencia"); //buscando dados no redis

        if (dadosCache) { //verificando se tem ou não cache
            // retornando dados do redis
            console.log("Dados do cache");
            return res.json(JSON.parse(dadosCache));
        }
        //retornando dados do mongo
        return res.json(JSON.parse(await addCache("/ocorrencia")));
    } catch (err) {
        console.error('Erro ao buscar dados do MongoDB:', err);
        res.status(500).json({ error: 'Erro ao buscar dados do MongoDB' });
    }
};

export async function atualizarOcorrencias(req, res) {
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

        return res.json(JSON.parse(await addCache("/ocorrencia")));
    } catch (err) {
        console.error('Erro ao atualizar a ocorrência no MongoDB:', err);
        res.status(500).json({ error: 'Erro ao atualizar a ocorrência no MongoDB' });
    }
};

export async function deletarOcorrencias (req, res) {
    const { id } = req.body;
    const deletando = await Ocorrencia.findOneAndDelete({ _id: id });

    return res.status(200).json(JSON.parse(await addCache("/ocorrencia")));
};
