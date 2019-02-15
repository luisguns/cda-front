const URL_TO_FETCH_USUARIO = 'http://localhost:3000/usuario';
const URL_TO_FETCH_LOGIN = 'http://localhost:3000/usuario/login';


function addUsuario(){
    const usuario = pegarUsuarioForm();
    enviaUsuarioParaAPI(usuario);
}

function fazerLogin(){
    const usuarioInfo = pegarInfoUsuarioLogin();
    console.log(usuarioInfo);
    fazerLoginNaApi(usuarioInfo);
}

function fazerLoginNaApi(user){
    fetch(URL_TO_FETCH_LOGIN, {
        method: 'POST',
        mode: 'cors',
        redirect: 'follow',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(user)
    }).then(function (response) {
        response.json().then(function (data) {
            if( response.status == 401){
                const alert = document.getElementById('error-alert');
                console.log(data.msg)
                alert.innerHTML = data.msg;
                alert.style.display = 'block';
                
            } else {
                colocarNoLocalStorage(data);
                window.location.assign("../pages/index.html");
            }
        });
    });
};


function colocarNoLocalStorage(data){
    window.localStorage.setItem("token", data.token);
    window.localStorage.setItem("idUsuario", data.id_usuario);
}
function pegarInfoUsuarioLogin(){
    const user = document.getElementById("username").value;
    const senha = document.getElementById("password").value;
    const usuario = { usuario: user, senha: senha};
    return usuario;
}

function enviaUsuarioParaAPI(user) {
    fetch(URL_TO_FETCH_USUARIO, {
        method: 'POST',
        mode: 'cors',
        redirect: 'follow',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(user)
    }).then(function (response) {
        response.json().then(function (data) {
            if(response.status == 201){
                window.localStorage.setItem("usuario", data.nome);
                window.localStorage.setItem("idUsuario", data._id);
                window.location.assign("../pages/login.html");
            }
        });
    });
}

function pegarUsuarioForm(){
    const nomeUsuario = document.getElementById('input_nome').value;
    const emailUsuario = document.getElementById('input_email').value;
    const senhaUsuario = document.getElementById('input_senha').value;

    const usuario = {nome:nomeUsuario, senha: senhaUsuario, email: emailUsuario};
    
    return usuario
}

function pegarUsuario(){
    const id = window.localStorage.getItem("idUsuario");
    fetch(URL_TO_FETCH_USUARIO + "/" + id)
        .then(function (response) {
            response.json().then(function (users) {
                console.log(users)
                instanciarFormConta(users);
                
                
            });
        })
        .catch(function (err) {
            console.error('Failed retrieving information', err);
        });
}

function instanciarFormConta(user){
    document.getElementById("usuario").value = user.usuario;
    document.getElementById("email").value = user.email;
    document.getElementById('nome').value = user.nome;
    document.getElementById("senha");
 
}

const elemento = document.getElementById("nome_usuario_logado");
if (elemento != null){
    elemento.innerHTML = window.localStorage.getItem("usuario");
}



