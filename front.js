
let center = { lat: -6.888463202449027, lng: -38.558930105104125 }; 77
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
            });
            latitude = novoMarcador.getPosition().lat();
            longitude = novoMarcador.getPosition().lng();
            unico = false;
        }
    });
}


initMap();

function salvando() {
    const titulo = document.getElementById('titulo').value;
    const tipo = document.getElementById('tipo').value;
    const dataHora = document.getElementById('dataHora').value;
    const data = dataHora.split("T")[0]; // Separa a data
    const hora = dataHora.split("T")[1]; // Separa a hora

    console.log(titulo);

    const objetoOcorrencia = {
        id: "1234546",
        titulo: titulo,
        tipo: tipo,
        data: data,
        hora: hora, 
        latitude: latitude,
        longitude: longitude,
    };

    unico = true;

    fetch('http://localhost:3333/ocorrencia', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoOcorrencia)
    }).then(res => alert("Salvo com sucesso")
    ).catch(error => alert("Falha ao salvar"))

    location.reload();
};

function listar() {
    const inserir = document.getElementById('resposta');
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
    })
        .then(data => {
            console.log(data);
            inserir.innerHTML = `${data}`
        })
        .catch(error => {
            console.error('Erro:', error);
        });
};




// function initMap() {
//     var map = new google.maps.Map(document.getElementById('map'), {
//         center: { lat: -23.550520, lng: -46.633308 },
//         zoom: 14
//     });

//     var geocoder = new google.maps.Geocoder();

//     google.maps.event.addListener(map, 'click', function(event) {
//         var marker = new google.maps.Marker({
//             position: event.latLng,
//             map: map
//         });

//         geocoder.geocode({ 'location': event.latLng }, function(results, status) {
//             if (status === 'OK') {
//                 if (results[0]) {
//                     console.log('Endereço:', results[0].formatted_address);
//                 }
//             }
//         });
//     });

//     var form = document.getElementById('address-form');
//     form.addEventListener('submit', function(event) {
//         event.preventDefault();
//         var address = document.getElementById('address').value;

//         geocoder.geocode({ 'address': address }, function(results, status) {
//             if (status === 'OK') {
//                 var location = results[0].geometry.location;
//                 var marker = new google.maps.Marker({
//                     position: location,
//                     map: map
//                 });
//                 console.log('Novo Marcador Adicionado:', location.lat(), location.lng());
//             } else {
//                 console.error('Não foi possível encontrar o endereço:', status);
//             }
//         });
//     });
// }
