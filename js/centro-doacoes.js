const URL_TO_FETCH_CENTRO = 'http://localhost:3000/centro-doacao/';

function pegarCentrosDaApi() {
  fetch(URL_TO_FETCH_CENTRO)
    .then(function (response) {
      response.json().then(function (centros) {
        instanciarMenu(centros);
        if(document.getElementById('selectCentroDoar')){
          instanciarSelect(centros);
        }
        

      });
    })
    .catch(function (err) {
      console.error('Failed retrieving information', err);
    });
}

function instanciarSelect(centro) {

  centro.forEach(element => {
    eOption = document.createElement("option"); // Elemento Option
    textoOption = document.createTextNode(element.nome); // Texto do option
    eSelect = document.getElementById("selectCentroDoar"); //Elemento Select

    eOption.setAttribute("value", element._id);
    eOption.appendChild(textoOption);

    eSelect.appendChild(eOption);
  });

}

function instanciarMenu(centros) {
  const ul = document.getElementById('listaCentroDeDoacoes');
  ul.innerHTML = null;
  centros.forEach(centro => {
      const li = document.createElement('li');
      li.setAttribute('class', 'nav-item');
      li.innerHTML = `<a  href="#" class="nav-link" aria-expanded="false" onclick="irPaginaCentro('${centro._id}')">${centro.nome}</a>`;
      ul.appendChild(li);
  });
}


function irPaginaCentro(id){
  window.localStorage.setItem('centroAtual', id);
  window.location.assign('../pages/page2.html');
}