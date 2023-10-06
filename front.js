function salvando() {
    console.log("entrou no salvando");

    const objeto = {
        nome: document.getElementById('campoDeTexto').value
    }

    // console.log(objeto);

    // Adicionar um evento de clique ao botão
    fetch('http://localhost:3333/ocorrencia', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objeto)
    })
    // .then(res => alert("Salvo com sucesso")
    // ).catch(error => alert("Falha ao salvar"))
};
