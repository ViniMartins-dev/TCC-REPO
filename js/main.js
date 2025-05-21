new Swiper('.card-wrapper', { //iniciando o SwiperJS
  loop: true, //loop para o slider ficar infinito
  spaceBetween: 30,
  autoplay: {
    delay: 3000, //delay da transição entre slides

  },

  //bolinhas embaixo do slide
  pagination: {
    el: '.swiper-pagination', 
    clickable: true, //bolinha clicavel
    bottomDinamico  : true //bolinha acompanha a transição dos slides
  },

  navigation: {
    nextEl: '.swiper-button-next', //botão de proximo
    prevEl: '.swiper-button-prev', //botão de anterior
  },

  //Responsividade dos breakpoints
  breakpoints: {
    0: {
      slidesPerView: 1
    },
    768: { 
      slidesPerView: 2
    },
    1024: {
      slidesPerView: 3
    },
  }
});
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
if (!estaLogado()) {
  let boxLinks = document.getElementById("box-links")
  boxLinks.innerHTML = `
      <a id="link" href="login.html#cadastro">Login</a>
  `
} else if (cookieUsuario.tipo == "tutor") {
  let boxLinks = document.getElementById("box-links")
  let linkCadastro = document.getElementById("sidebarLinkCadastro")
  linkCadastro.style.display = "none";
  boxLinks.innerHTML = `
      <a id="link" href="favoritos.html">Favoritos</a>
      <a id="link" href="perfil.html">Perfil</a>
  `
} else {
}

class Animal {
  async isFavorite(idAnimal) {
    if (!estaLogado()) {
      return false;
    } else {
      let response = await fetch(`http://localhost:3000/favoritos/listar/${cookieUsuario.id}`, {
        headers: {
          bearer: cookieUsuario.token
        }
      })
      let dados = await response.json();
      return dados.some(elemento => elemento.animal_id == idAnimal);
    }
  } 

  async desfavoritar(idUser, idAnimal) {
    try {
      let response = await fetch(`http://localhost:3000/favoritos/${idAnimal}/${idUser}`, {
        method: "DELETE",
        headers: {
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

  async alterarFavorito(idAnimal) {
    if (estaLogado()) {
      if (await this.isFavorite(idAnimal)) {
        await this.desfavoritar(cookieUsuario.id, idAnimal) 
        popup.trocarIconCoracaoParaNormal()
      } else {
        await this.favoritar(cookieUsuario.id, idAnimal)
        popup.trocarIconCoracaoParaFavoritado()
      }
    } else {
      irParaLogin()
    }
  }
  async adotar(idAnimal) {
    if (estaLogado()) {
      let response = await fetch(`http://localhost:3000/adocao/request`, {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
           bearer: cookieUsuario.token
        },
        body: JSON.stringify({
          "animal_id": idAnimal,
          "tutor_id": cookieUsuario.id
        })
      })
      if (response.ok) {
        popup.inserirPopupPedidoDeAdocao();
      }
    } else {
      irParaLogin()
    }
  }
}
const animal = new Animal();

class PopupAnimal {
  constructor() {
    this.overlay = document.getElementById("overlay");
    this.body = document.getElementById("body");
    this.iconCoracao; 
  }

  abrir(animalStr){
    this.body.style.overflow = "hidden";
    this.overlay.style.display = "flex";
    this.inserirConteudo(animalStr)
  }

  fechar() {
    this.body.style.overflow = "";
    this.overlay.style.display = "none";
  }
  inserirPopupPedidoDeAdocao() {
    this.overlay.innerHTML = `
      <div class="popupPedidoAdocao" onclick="event.stopPropagation()">
        <h1>Atenção</h1>
        <p>
          Seu pedido de adoção foi enviado!
          <br>
          Por favor aguarde a aprovação
        </p>
        <button onclick="popup.fechar()">Fechar</button>
      </div>
    `
  }
  async inserirConteudo(animalStr) {
    let animalObj = decodificaStrEmObj(animalStr);
    let verificaSeEstaFavoritado = await animal.isFavorite(animalObj.id);
    this.overlay.innerHTML = `
      <div class="popup" onclick="event.stopPropagation()">
        <img src="${animalObj.fotoURL}" class="popup-img"/>
        <div class="popup-content">
          <i onclick="animal.alterarFavorito(${animalObj.id})" id="popup-btnFavoritar" class="popup-btnFavoritar fa-regular fa-heart"></i>
          <p class="popup-text"><b>Nome:</b> ${animalObj.nome}</p>
          <p class="popup-text"><b>Idade:</b> ${animalObj.idade}</p>
          <p class="popup-text"><b>Raca:</b> ${animalObj.raca}</p>
          <p class="popup-text"><b>Sexo:</b> ${animalObj.sexo}</p>
          <p class="popup-text"><b>Personalidade:</b> <br> ${animalObj.personalidade}</p>
          <p class="popup-text"><b>Descricao:</b> <br> ${animalObj.descricao}</p>
          <button id="popup-btnAdotar" onclick="animal.adotar(${animalObj.id})">Adotar</button>
        </div>
      </div>
    `;
    this.iconCoracao = document.getElementById("popup-btnFavoritar")
    if (verificaSeEstaFavoritado) {
      this.trocarIconCoracaoParaFavoritado()
    } else {
      this.trocarIconCoracaoParaNormal()
    }
  }

  trocarIconCoracaoParaNormal() {
      this.iconCoracao.classList.replace("fa-solid", "fa-regular");
      this.iconCoracao.style.color = "#000000";
  }

  trocarIconCoracaoParaFavoritado() {
      this.iconCoracao.classList.replace("fa-regular", "fa-solid");
      this.iconCoracao.style.color = "#E31B23";
  }
}

const popup = new PopupAnimal();

async function inserirQuadradosDosAnimais(params) {
  let jsonApi = await consumirApi(`http://localhost:3000/animal/filtrar/?${params}`)
  let boxAnimais = document.getElementById("container-animais");
  boxAnimais.innerHTML = "";
  jsonApi.forEach((animal) => {
    // Transforma o obj em uma string codigicada para passar pelo parametro
    let animalStr = encodeURIComponent(JSON.stringify(animal));
    let conteudo = `
      <div class="container-animais-item">
      <div class="container-animais-item-overlay" onclick="popup.abrir('${animalStr}')"></div>
      <img class="animais-item-img" src="${animal.fotoURL}" alt="imagem do animal">
      <h6 class="animais-item-text">Nome: ${animal.nome}</h6>
      <h6 class="animais-item-text">Raça: ${animal.raca}</h6>
      <h6 class="animais-item-text">Idade: ${animal.idade}</h6>
      </div>
    `;
    boxAnimais.innerHTML += conteudo;
  });
};

function decodificaStrEmObj(str) {
    return JSON.parse(decodeURIComponent(str))
}
async function consumirApi(url) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const dados = await response.json();
  return dados;
}

function contemClasse(element,classe) {
  if (element.classList.contains(classe)) {
    return true
  } else {
    return false
  }
}
function selecionar(elemento) {
  if (elemento.classList.contains("filRaca-option")) {
    if (elemento.classList.contains("checked")) {
      elemento.classList.remove("checked");
    } else {
      elemento.classList.add("checked")
    }   
  } else if (elemento.classList.contains("filPersonalidade-option")) {
    if (elemento.classList.contains("checked")) {
      elemento.classList.remove("checked");
    } else {
      elemento.classList.add("checked")
    }   
  }
}
class Sidebar {
  constructor() {
    this.sidebar = document.getElementById("sidebar");
    this.body = document.getElementById("body");
  }
  abrir() {
    this.body.style.overflow = "hidden"
    this.sidebar.style.display = "flex";
  }
  fechar() {
    this.body.style.overflow = "scroll"
    this.sidebar.style.display = "none";
  }
}

const sidebar = new Sidebar();

class MenuFiltro {
  constructor() {
    this.menu = document.getElementById("menu-filtros");
    this.body = document.getElementById("body");
  }
  abrir() {
    this.body.style.overflow = "hidden";
    this.menu.classList.add("active")
  }
  fechar() {
    this.body.style.overflow = "scroll";
    this.menu.classList.remove("active")
  }
}

const menuFiltro = new MenuFiltro();

function irParaHome() {
  window.location.href = "./index.html"
}

function irParaLogin() {
  window.location.href = "login.html#cadastro"
}

inserirQuadradosDosAnimais("");
