function pegarCookieUsuario() {
  const cookies = document.cookie.split('; ');
  for (let cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key === "usuario") return JSON.parse(decodeURIComponent(value));
  }
  return null;
}
const cookieUsuario = pegarCookieUsuario()

const user = {
  id : cookieUsuario.id,
}

let contador = 0;
class AnimaisFavoritos {
  async buscarAnimaisFavoritos(idUser) {
    let response = await fetch(`http://localhost:3000/favoritos/listar/${idUser}`)
    let dados = await response.json();
    return dados;
  } 
  async isFavorite(idUser, idAnimal) {
    let response = await fetch(`http://localhost:3000/favoritos/listar/${idUser}`)
    let dados = await response.json();
    return dados.some(elemento => elemento.animal_id == idAnimal);
  } 
  async buscarAnimal(idAnimal) {
    let response = await fetch(`http://localhost:3000/animal/show/${idAnimal}`)
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
        method: "DELETE"
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
          'Content-Type':'application/json'
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
  for (const element of dados) {
    contador++;
    let animal = await animaisFavoritos.buscarAnimal(element.animal_id);
    containerAnimais.innerHTML += `
      <div class="container-animais-item">
        <img class="animais-item-img" src="${animal.fotoURL}" alt="dog1">
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
inserirQuadradosDosAnimaisFavoritos(user.id);
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
  window.location.href = "./index.html"
}
