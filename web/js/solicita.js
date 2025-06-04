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
  window.location.href = "./home.html"
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
async function filtrarSolicitacoes() {
  let entregando = [];
  let entregues = [];
  let pendentes = [];
  let rejeitadas = [];
  let json = await buscarSolicitacoes();
  json.forEach((solicitacao) => {
    if (solicitacao.status == "pendente") {
      pendentes.push(solicitacao)
    } else if (solicitacao.status == "aprovada") {
      entregando.push(solicitacao)
    } else if (solicitacao.status == "entregue") {
      entregues.push(solicitacao)
    } else if (solicitacao.status == "rejeitada") {
      rejeitadas.push(solicitacao)
    }
  })
  return {
    pendentes,
    entregando,
    entregues,
    rejeitadas
  };
}


async function inserirQuadradosSolicitacoesPendente() {
  let main = document.getElementById("main");
  let box;
  let resultado = await filtrarSolicitacoes();
  let pendentes = resultado.pendentes
  if (pendentes.length == 0 ) {
    return false;
  } else {
    main.innerHTML += `
    <div class="status-box"> 
      <h1>Pendentes:</h1>
      <div id="box_pendentes" class="box_pendentes">
      </div>
    </div>
    `
    box = document.getElementById("box_pendentes")
    pendentes.forEach((solicitacao) => {
      let tutor = solicitacao.tutor
      let animal = solicitacao.animal
      box.innerHTML += `
        <section id="card">
          <img src="data:image/jpeg;base64,${animal.bin_foto}" alt="Foto do animal" id="foto-animal">
        <div class="card-body">
        <div id="titulo-adotante">Adotante</div>
        <div class="info"><strong>Email:</strong>${tutor.email}</div>
        <div class="info"><strong>Telefone:</strong>${tutor.telefone}</div>
        <div id="titulo-animal"> Animal</div>
        <div class="info"><strong>Nome:</strong> ${animal.nome}</div>
        <div class="info"><strong>Espécie:</strong> ${animal.especie}</div>
        <div class="info"><strong>Raça:</strong> ${animal.raca}</div>
        <div class="info"><strong>Idade:</strong> ${animal.idade}</div>
        <div class="div-btn">
        <button class="btn-aprovar"onclick="aprovarAdocao(${solicitacao.id})">Aprovar</button>
        <button class="btn-rejeitar"onclick="reprovarAdocao(${solicitacao.id})">Recusar</button>
        </div>
        </div>
        </section>
        `
    })
    return true
  }
  // if (json.length == 0) {
    //     main.style.display = "flex";
    //     main.style.height = "90vh";
    //     main.innerHTML = "";
    //     let conteudo = `
    //       <div class="avisoNaoHaAnimais">
      //           <img src="../img/silhueta_dog.jpg" alt="cachorro"></img>
      //           <p>Não há solicitações no momento</p>
      //         </div>
      //       `;
    //     main.innerHTML += conteudo;
    //   }
}

async function inserirQuadradosSolicitacoesEntregando() {
  let main = document.getElementById("main");
  let box;
  let resultado = await filtrarSolicitacoes();
  let entregando = resultado.entregando
  if (entregando.length == 0 ) {
    return false;
  } else {
    main.innerHTML += `
      <div class="status-box"> 
        <h1>Entregando:</h1>
        <div id="box_entregando" class="box_entregando">
        </div>
      </div>
    `
    box = document.getElementById("box_entregando")
    entregando.forEach((solicitacao) => {
      let tutor = solicitacao.tutor
      let animal = solicitacao.animal
      box.innerHTML += `
        <section id="card">
        <img src="data:image/jpeg;base64,${animal.bin_foto}" alt="Foto do animal" id="foto-animal">
        <div class="card-body">
        <div id="titulo-adotante">Adotante</div>
        <div class="info"><strong>Email:</strong>${tutor.email}</div>
        <div class="info"><strong>Telefone:</strong>${tutor.telefone}</div>
        <div id="titulo-animal"> Animal</div>
        <div class="info"><strong>Nome:</strong> ${animal.nome}</div>
        <div class="info"><strong>Espécie:</strong> ${animal.especie}</div>
        <div class="info"><strong>Raça:</strong> ${animal.raca}</div>
        <div class="info"><strong>Idade:</strong> ${animal.idade}</div>
        <div class="div-btn">
        <button class="btn-entregue"onclick="validarEntrega(${solicitacao.id})">Entregar</button>
        </div>
        </div>
        </section>
        `
    })
    return true
  }
}
async function inserirQuadradosSolicitacoesRejeitadas() {
  let main = document.getElementById("main");
  let box;
  let resultado = await filtrarSolicitacoes();
  let rejeitadas = resultado.rejeitadas
  if (rejeitadas.length == 0 ) {
    return false;
  } else {
    main.innerHTML += `
      <div class="status-box"> 
        <h1>Rejeitadas:</h1>
        <div id="box_rejeitadas" class="box_rejeitadas">
        </div>
      </div>
    `
    box = document.getElementById("box_rejeitadas")
    rejeitadas.forEach((solicitacao) => {
      let tutor = solicitacao.tutor
      let animal = solicitacao.animal
      box.innerHTML += `
        <section id="card">
        <img src="data:image/jpeg;base64,${animal.bin_foto}" alt="Foto do animal" id="foto-animal">
        <div class="card-body">
        <div id="titulo-adotante">Adotante</div>
        <div class="info"><strong>Email:</strong>${tutor.email}</div>
        <div class="info"><strong>Telefone:</strong>${tutor.telefone}</div>
        <div id="titulo-animal"> Animal</div>
        <div class="info"><strong>Nome:</strong> ${animal.nome}</div>
        <div class="info"><strong>Espéci2:</strong> ${animal.especie}</div>
        <div class="info"><strong>Raça:</strong> ${animal.raca}</div>
        <div class="info"><strong>Idade:</strong> ${animal.idade}</div>
        <div class="div-btn">
        </div>
        </div>
        </section>
        `
    })
    return true
  }
}

async function inserirQuadradosSolicitacoesEntregues() {
  let main = document.getElementById("main");
  let box;
  let resultado = await filtrarSolicitacoes();
  let entregues = resultado.entregues
  if (entregues.length == 0 ) {
    return false;
  } else {
    main.innerHTML += `
      <div class="status-box"> 
        <h1>Entregues:</h1>
        <div id="box_entregue" class="box_entregue">
        </div>
      </div>
    `
    box = document.getElementById("box_entregue")
    entregues.forEach((solicitacao) => {
      let tutor = solicitacao.tutor
      let animal = solicitacao.animal
      box.innerHTML += `
        <section id="card">
        <img src="data:image/jpeg;base64,${animal.bin_foto}" alt="Foto do animal" id="foto-animal">
        <div class="card-body">
        <div id="titulo-adotante">Adotante</div>
        <div class="info"><strong>Email:</strong>${tutor.email}</div>
        <div class="info"><strong>Telefone:</strong>${tutor.telefone}</div>
        <div id="titulo-animal"> Animal</div>
        <div class="info"><strong>Nome:</strong> ${animal.nome}</div>
        <div class="info"><strong>Espécie:</strong> ${animal.especie}</div>
        <div class="info"><strong>Raça:</strong> ${animal.raca}</div>
        <div class="info"><strong>Idade:</strong> ${animal.idade}</div>
        <div class="div-btn">
        </div>
        </div>
        </section>
        `
    })
    return true
  }
}
async function inserirQuadradosSolicitacoes() {
  let main = document.getElementById("main");
  let pendentes = await inserirQuadradosSolicitacoesPendente()
  let entregando = await inserirQuadradosSolicitacoesEntregando()
  let entregues = await inserirQuadradosSolicitacoesEntregues()
  let rejeitadas = await inserirQuadradosSolicitacoesRejeitadas()
  if (!pendentes && !entregando && !entregues && !rejeitadas) {
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
    console.log("ixi")
  }
}
inserirQuadradosSolicitacoes()
async function validarEntrega(idAdocao) {
  let response = await fetch("http://localhost:3000/adocao/confirmar", {
    method : "PUT", 
    headers : {
      bearer: cookieUsuario.token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "idAdocao": idAdocao,
    })
  })
  recarregaPagina()
}

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
  
