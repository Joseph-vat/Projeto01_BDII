let map;
let marker;

let center = {lat: -6.888463202449027, lng: -38.558930105104125};
 let novoMarcador;
 let latitude;
 let longitude



function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: center,
        zoom: 14,
      });

    
  map.addListener('click', (event) => { 
    novoMarcador = new google.maps.Marker({
      position: event.latLng,
      map: map,
      title: document.getElementById('campoDeTexto').value,
    });
    latitude = novoMarcador.getPosition().lat();
    longitude = novoMarcador.getPosition().lng();
  });

}



function salvando() {
    // const nome = document.getElementById('nome').value;
    const obj = {
        nome: latitude,
        nome2: longitude     
    }; 

    console.log("entrou no salvando");  
    console.log({obj});

    // const objeto = {
    //     nome: document.getElementById('campoDeTexto').value,
    //     nome2: document.getElementById('campoDeTexto2').value
    // }

    // console.log(obj);

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
