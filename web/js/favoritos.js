function pegarCookieUsuario() {
  const cookies = document.cookie.split('; ');
  for (let cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key === "usuario") return JSON.parse(decodeURIComponent(value));
  }
  return null;
}
const cookieUsuario = pegarCookieUsuario()

function irParaLogin() {
  window.location.href = "login.html#cadastro"
}

function estaLogado() {
  if (cookieUsuario == null) {
    return false
  } else {
    return true
  }
}

if (!estaLogado()) {
  irParaLogin()
} else if (cookieUsuario.tipo == "tutor") {
  let boxLinks = document.getElementById("box-links")
  let linkCadastro = document.getElementById("sidebarLinkCadastro")
  let containerMain = document.getElementById("container-main")
  containerMain.innerHTML = `
    <button onclick="logout()"class="botao">
      <i class="fa fa-sign-out-alt"></i>Sair
    </button>
  `
  linkCadastro.style.display = "none";
  boxLinks.innerHTML = `
      <a id="link" href="home.html">Home</a>
  `
}

function logout() {
  document.cookie = "usuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  irParaHome()
}

let contador = 0;
class AnimaisFavoritos {
  async buscarAnimaisFavoritos(idUser) {
    let response = await fetch(`http://localhost:3000/favoritos/listar/${idUser}`, {
      headers: {
        bearer: cookieUsuario.token
      }
    })
    let dados = await response.json();
    return dados;
  } 
  async isFavorite(idUser, idAnimal) {
    let response = await fetch(`http://localhost:3000/favoritos/listar/${idUser}`, {
      headers: {
        bearer: cookieUsuario.token
      }
    })
    let dados = await response.json();
    return dados.some(elemento => elemento.animal_id == idAnimal);
  } 
  async buscarAnimal(idAnimal) {
    let response = await fetch(`http://localhost:3000/animal/show/${idAnimal}`, {
      headers: {
        bearer: cookieUsuario.token
      }
    })
    let dados = response.json();
    return dados;
  }
  async alterarFavorito(idUser, idAnimal, id) {
    if (await this.isFavorite(idUser, idAnimal)) {
      await this.desfavoritar(idUser, idAnimal) 
      this.trocarIconCoracaoParaNormal(id)
    } else {
      await this.favoritar(idUser, idAnimal)
      this.trocarIconCoracaoParaFavoritado(id)
    }
  }
  async desfavoritar(idUser, idAnimal) {
    try {
      let response = await fetch(`http://localhost:3000/favoritos/${idAnimal}/${idUser}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          bearer: cookieUsuario.token
        }
      })
      if (!response.ok) throw new Error("Erro ao remover favorito")
    } catch (erro) {
      console.log(erro)
    }
  }
  async favoritar(idUser, idAnimal) {
    try {
       let response = await fetch("http://localhost:3000/favoritos/", {
        method: "POST",
        headers: {
          'Content-Type':'application/json',
          bearer: cookieUsuario.token
        },
        body: JSON.stringify({
          "usuario_id": idUser,
          "animal_id": idAnimal
        })
      });
      if (!response.ok) {
        throw new Error("Erro ao favoritar animal")
      }
    } catch (erro) {
      console.log(erro)
    }
  }
  trocarIconCoracaoParaNormal(id) {
    let idString = "btnFavoritar" + id;  
    let heart = document.getElementById(idString);
    heart.classList.replace("fa-solid", "fa-regular");
    heart.style.color = "#000000";
  }

  trocarIconCoracaoParaFavoritado(id) {
    let idString = "btnFavoritar" + id;  
    let heart = document.getElementById(idString);
    heart.classList.replace("fa-regular", "fa-solid");
    heart.style.color = "#E31B23";
  }
}
const animaisFavoritos = new AnimaisFavoritos();

async function inserirQuadradosDosAnimaisFavoritos(idUser) {
  let dados = await animaisFavoritos.buscarAnimaisFavoritos(idUser)
  let containerAnimais = document.getElementById("container-animais")
  if (dados.length == 0) {
    console.log("vazio")
    containerAnimais.style.display = "flex";
    containerAnimais.style.height = "100%";
    containerAnimais.innerHTML = "";
    let conteudo = `
      <div class="avisoNaoHaAnimais">
        <img src="../img/silhueta_dog.jpg" alt="cachorro"></img>
        <p>Não há animais favoritados</p>
      </div>
    `;
    containerAnimais.innerHTML += conteudo;
  } else {
    for (const element of dados) {
      contador++;
      let animal = await animaisFavoritos.buscarAnimal(element.animal_id);
      containerAnimais.innerHTML += `
        <div class="container-animais-item">
        <img class="animais-item-img" src="${animal.fotoBase64}" alt="dog1">
        <div class="item-content">
        <i class="btnFavoritar fa-solid fa-heart" onclick="animaisFavoritos.alterarFavorito(${idUser}, ${animal.id}, ${contador})" id="btnFavoritar${contador}"></i>
        <h6 class="animais-item-text">Nome: ${animal.nome}</h6>
        <h6 class="animais-item-text">Raça: ${animal.raca}</h6>
        <h6 class="animais-item-text">Idade: ${animal.idade}</h6>
        </div>
        </div>
        `;
    }
  }
}
inserirQuadradosDosAnimaisFavoritos(cookieUsuario.id);
// Troca a cor do coração de favoritar
function favoritar(id) {
  /* Aqui dentro vai ser feito o processo de favoritar o animal
  na tabela de favoritos e de desfavoritar tambem */
  let idString = "btnFavoritar" + id;
}

function abrirMenu() {
  let sidebar = document.getElementById("sidebar");
  let body = document.getElementById("body");
  body.style.overflow = "hidden"
  sidebar.style.display = "flex";
}
function fecharMenu() {
  let sidebar = document.getElementById("sidebar");
  let body = document.getElementById("body");
  body.style.overflow = "scroll"
  sidebar.style.display = "none";
}

function irParaHome() {
  window.location.href = "./home.html"
}

function irParaSolicitacoes() {
  window.location.href = "solicita.html"
}

function irParaAnimaisCadastrados() {
  window.location.href = "./animais_cadastrados.html"
}

const colocarInfos = async () => {
  let box = document.getElementById("box-infos")
  if (cookieUsuario.tipo == "tutor") {
    box.innerHTML = `
      <h1>Perfil</h1>
      <p id="nome-user">Nome: ${cookieUsuario.nome}</p>
      <p id="sobrenome-user">Sobrenome: ${cookieUsuario.sobrenome}</p>
      <p id="email-user">Email: ${cookieUsuario.email}</p>
      <p id="tel-user">Telefone: ${cookieUsuario.telefone}</p>
      <p id="cpf-user">CPF: ${cookieUsuario.cpf}</p>
    `
  } else {
    box.innerHTML = `
      <h1>Perfil</h1>
      <p id="nome-user">Nome: ${cookieUsuario.nome_fantasia}</p>
      <p id="email-user">Email: ${cookieUsuario.email}</p>
      <p id="tel-user">Telelfone: ${cookieUsuario.telefone}</p>
      <p id="cnpj-user">CNPJ: ${cookieUsuario.cnpj}</p>
    `
  }
}
colocarInfos()
