
let center = { lat: -6.888463202449027, lng: -38.558930105104125 };
let novoMarcador, map, marcadorUnico = true;
let latitude, longitude;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: center,
        zoom: 14,
    });

    map.addListener('click', (event) => {
        if (marcadorUnico) {
            novoMarcador = new google.maps.Marker({
                position: event.latLng,
                map: map,
                title: document.getElementById('titulo').value,
                draggable: true
            });
            latitude = novoMarcador.getPosition().lat();
            longitude = novoMarcador.getPosition().lng();
            marcadorUnico = false;
        }
    });
}


const Evento = require('./eventoModel');





function salvar() {
    const titulo = document.getElementById('titulo').value;
    const tipo = document.getElementById('tipo').value;
    const dataHora = document.getElementById('dataHora').value;

    const ocorrencia = {
        titulo,
        tipo,
        dataHora: new Date(dataHora).toISOString(), 
        latitude,
        longitude
    };
    
    fetch('http://localhost:3333/ocorrencia', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ocorrencia)
    }).then(response => {
            alert("Salvo com sucesso");
            location.reload(); // Recarrega a página ou executa outra ação após a exclusão
        
    }).catch(error => {
        alert("Falha ao salvar");
    });

    marcadorUnico = true;
    location.reload();
};

async function listandoTabela(){
    console.log("aqui");
    const response = await fetch('http://localhost:3333/ocorrencia'); // Rota para buscar dados no servidor
    const data = await response.json();
    const tabela = document.getElementById('tabela');
    const tbody = tabela.querySelector('tbody');
    tbody.innerHTML = ''; // Limpa o conteúdo anterior da tabela

    data.forEach((ocorrencia) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${ocorrencia._id}</td>
            <td>${ocorrencia.titulo}</td>
            <td>${ocorrencia.tipo}</td>
            <td>${ocorrencia.dataHora}</td>
        `;
        tbody.appendChild(row);
    });
};


function listar() {
    fetch('http://localhost:3333/ocorrencia', {
        method: "GET",
        headers: {
            'Accept': 'application/json',
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição');
        }
        return response.json();
    }).then(data => {
        data.forEach(data => {
            const { localizacao, titulo } = data;
            const latitude = localizacao.coordinates[1];
            const longitude = localizacao.coordinates[0];

            // Cria um marcador
            const marcador = new google.maps.Marker({
                position: { lat: latitude, lng: longitude },
                map: map, // 'map' é a referência para seu mapa do Google Maps
                title: titulo, // Título do marcador (exibido quando o usuário passa o mouse sobre o marcador)
            });

            const janelaInfo = `
              <div id="content">
                <div id="siteNotice">
                </div>
                <h2> ${data.titulo}</h2>
                <p> <b> Tipo: </b> ${data.tipo}</p>
                <p> <b> Data: </b> ${data.data}</p>
                <p> <b> Hora: </b> ${data.hora}</p>
                </div>
              </div>`;
            marcador.addListener('click', () => {
                const infoWindow = new google.maps.InfoWindow({
                    content: janelaInfo,
                });
                infoWindow.open(map, marcador);
            });
        }).catch(error => {
            console.error('Erro:', error);
        });
    })
};

function atualizar(){
    const titulo = document.getElementById('titulo').value;
    const tipo = document.getElementById('tipo').value;
    const dataHora = document.getElementById('dataHora').value;
    const id=  document.getElementById('idDel').value
    const dataHoras= new Date(dataHora).toISOString()

    const ocorrencia = {
        id,
        titulo,
        tipo,
        dataHora: dataHoras, 
        latitude,
        longitude
    };
    
    fetch('http://localhost:3333/ocorrencia', {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ocorrencia)
    }).then(res => {
            alert("Atualizado com sucesso");
            location.reload(); // Recarrega a página ou executa outra ação após a exclusão
    }).catch(error => {
        alert("Falha ao atualizar");
    });

    marcadorUnico = true;
    location.reload();
}



function deletar(){
    // const id = document.getElementById('idDel')
    const id = {
        id: document.getElementById('idDel').value
    };
    fetch(`http://localhost:3333/ocorrencia`, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(id)
    }).then(response => {
        if (response.status === 201) {
            alert("Excluído com sucesso");
            location.reload(); // Recarrega a página ou executa outra ação após a exclusão
        } else {
            alert("Falha ao excluir");
        }
    }).catch(error => {
        alert("Falha ao excluir");
    });
}