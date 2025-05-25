function abrirMenu() {
  let sidebar = document.getElementById("sidebar");
  document.body.style.overflow = "hidden"
  sidebar.style.display = "flex";
}
function fecharMenu() {
  let sidebar = document.getElementById("sidebar");
  document.body.style.overflow = "scroll"
  sidebar.style.display = "none";
}
function irParaHome() {
  window.location.href = "./index.html"
}
function pegarCookieUsuario() {
  const cookies = document.cookie.split('; ');
  for (let cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key === "usuario") return JSON.parse(decodeURIComponent(value));
  }
  return null;
}
const cookieUsuario = pegarCookieUsuario()

function estaLogado() {
  if (cookieUsuario == null) {
    return false
  } else {
    return true
  }
}
function recarregaPagina() {
  window.location.reload()
}
async function buscarSolicitacoes() {
  let response = await fetch(`http://localhost:3000/adocao/protetor/${cookieUsuario.id}`, {
    method: "GET",
    headers: {
       bearer: cookieUsuario.token
    }
  })
  let json = await response.json()
  return json;
}
async function inserirQuadradosSolicitacoes() {
  let main = document.getElementById("main");
  let json = await buscarSolicitacoes();
  if (json.length == 0) {
    main.style.display = "flex";
    main.style.height = "90vh";
    main.innerHTML = "";
    let conteudo = `
      <div class="avisoNaoHaAnimais">
        <img src="../img/silhueta_dog.jpg" alt="cachorro"></img>
        <p>Não há solicitações no momento</p>
      </div>
    `;
    main.innerHTML += conteudo;
  } else {
    json.forEach((solicitacao) => {
      let tutor = solicitacao.tutor
      let animal = solicitacao.animal
      if (solicitacao.status == "pendente") {
        main.innerHTML += `
          <section id="card">
          <div class="card-header">
          Solicitação de Adoção - Pendente 
          </div>
          <div class="card-body">
          <div id="titulo-adotante">Adotante</div>
          <div class="info"><strong>Email:</strong>${tutor.email}</div>
          <div class="info"><strong>Telefone:</strong>${tutor.telefone}</div>
          <div id="titulo-animal"> Animal</div>
          <img src="data:image/jpeg;base64,${animal.bin_foto}" alt="Foto do animal" id="foto-animal">
          <div class="info">Nome: ${animal.nome}</div>
          <div class="info">Espécie: ${animal.especie}</div>
          <div class="info">Raça: ${animal.raca}</div>
          <div class="info">Idade: ${animal.idade}</div>
          <div class="div-btn">
          <button onclick="aprovarAdocao(${solicitacao.id})">Aprovar</button>
          <button onclick="reprovarAdocao(${solicitacao.id})"style="background-color:#f44336;">Recusar</button>
          </div>
          </div>
          </section>
          `
      }
    })
  }
}
inserirQuadradosSolicitacoes()

async function aprovarAdocao(idAdocao) {
  let response = await fetch("http://localhost:3000/adocao/aprovar", {
    method : "PUT", 
    headers : {
      bearer: cookieUsuario.token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "idAdocao": idAdocao,
      "aval": "aprovada"
    })
  })
  recarregaPagina()
}
async function reprovarAdocao(idAdocao) {
  let response = await fetch("http://localhost:3000/adocao/aprovar", {
    method : "PUT", 
    headers : {
      bearer: cookieUsuario.token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "idAdocao": idAdocao,
      "aval": "rejeitada"
    })
  })
  recarregaPagina()
}
// EXEMPLO DE API 

// const cardSolicita =  async (id) => {
//   try {
//     const rotaAPI = await fetch(`/cadastrados/${id}`, {method: 'GET'});
  
//     if(!rotaAPI.ok) {
//     console.log('ERRO na busca dos dados !');
//     return;
//   }

//   const dados = await rotaAPI.json();
//   const card = document.getElementById('card');
//   card.innerHTML = `
//     <div>
//         <p>visualização: ${dados.nome}, ${dados.especie}, ${dados.Usernome}</p>
//     </div>
// `
// } catch(e) {
//   console.log('Erro em encontrar solicitação')
// }

// }
  
