function salvando() {
    console.log("entrou no salvando");

    const objeto = {
        nome: document.getElementById('campoDeTexto').value,
        nome2: document.getElementById('campoDeTexto2').value
    }

    // console.log(objeto);

    fetch('http://localhost:3333/ocorrencia', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objeto)
    })
        .then(res => alert("Salvo com sucesso")
        ).catch(error => alert("Falha ao salvar"))
};

function listar() {
    const inserir = document.getElementById('resposta');
    fetch('http://localhost:3333/ocorrencia', {
        method: "GET",
        headers: {
            'Accept':'application/json',
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição');
        }
        return response.json();
    })
        .then(data => {
            inserir.innerHTML = `${data}`
        })
        .catch(error => {
            console.error('Erro:', error);
        });
};

