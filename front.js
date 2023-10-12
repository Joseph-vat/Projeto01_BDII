
let center = { lat: -6.888463202449027, lng: -38.558930105104125 };
let novoMarcador, map, unico = true;
let latitude, longitude;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: center,
        zoom: 14,
    });

    map.addListener('click', (event) => {
        if (unico) {
            novoMarcador = new google.maps.Marker({
                position: event.latLng,
                map: map,
                title: document.getElementById('titulo').value,
                draggable: true
            });
            latitude = novoMarcador.getPosition().lat();
            longitude = novoMarcador.getPosition().lng();
            unico = false;
        }
    });
}

function salvar() {
    const titulo = document.getElementById('titulo').value;
    const tipo = document.getElementById('tipo').value;
    const dataHora = document.getElementById('dataHora').value;
    const data = dataHora.split("T")[0]; // Separa a data
    const hora = dataHora.split("T")[1]; // Separa a hora

    const objetoOcorrencia = {
        id: "idTTemp",
        titulo: titulo,
        tipo: tipo,
        data: data,
        hora: hora,
        latitude: latitude,
        longitude: longitude,
    };

    fetch('http://localhost:3333/ocorrencia', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoOcorrencia)
    }).then(res => alert("Salvo com sucesso")
    ).catch(error => alert("Falha ao salvar"))

    unico = true;
    location.reload();
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
            const { geometria, titulo } = data;
            const latitude = geometria.coordinates[1]; // Assumindo que latitude está na posição 1
            const longitude = geometria.coordinates[0];

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