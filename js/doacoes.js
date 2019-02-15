const URL_TO_FETCH_DOACAO = 'http://localhost:3000/doacao/';

function pegarDoacoes() {
  const idCentro = window.localStorage.getItem('centroAtual');
  fetch(URL_TO_FETCH_DOACAO + 'centro-doacao/' + idCentro)
    .then(function (response) {
      response.json().then(function (doacoes) {
        carregarTabelaDeTarefas(doacoes);

      });
    })
    .catch(function (err) {
      console.error('Failed retrieving information', err);
    });
}

function teste(){
  alert('eee')
}

function carregarTabelaDeTarefas(doacoes) {
  const tabela = document.getElementById('tabelaDeDoacoes');
  tabela.innerHTML = null;
  doacoes.forEach(doacao => {
    console.log(doacao)
    const tr = document.createElement('tr');
    

    const td1 = document.createElement('td');
    td1.innerHTML = `<p> ${doacao.especie} </p>`

    const td2 = document.createElement('td');
    td2.innerHTML = `<p> ${doacao.sexo} </p>`

    const td3 = document.createElement('td');
    td3.innerHTML = `<p> ${doacao.raca} </p>`

   
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tabela.appendChild(tr);
  });
}

function addDoacao(){
  const doacao = pegarFormDoacao();
  enviarDoacapApi(doacao)
}


function pegarFormDoacao() {
  const memail = document.getElementById('emailDoar').value;
  const mcidade = document.getElementById('cidadeDoar').value;
  const mestado = document.getElementById('estadoDoar').value;
  const mespecie = document.getElementById('especieDoar').value;
  const mraca = document.getElementById('racaDoar').value;
  const msexo = document.getElementById('selectSexoDoar').value;
  const mcentro = window.localStorage.getItem('centroAtual');
  return { especie: mespecie, sexo: msexo, raca: mraca, estado: mestado, cidade: mcidade, email_contato: memail, centro_responsavel:mcentro };
}



function enviarDoacapApi(categoria) {
  fetch(URL_TO_FETCH_DOACAO, {
    method: 'POST',
    mode: 'cors',
    redirect: 'follow',
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(categoria)
  }).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
      console.log(response.status);
      if (response.status == 200) {
        alert("Doacao efetuada com sucesso");
      }

    });
  });
}




