//Carrossel
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

// Exemplo de json so para teste (ira ser retirado)
const exemploJsonApi = {
  animal1: {
    id: 1,
    nome: "Bolt",
    especie: "Negão",
    raca: "Labrador",
    idade: 3,
    sexo: "M",
    descricao: "Cachorro brincalhão e amigável, adora correr.",
    fotoURL:
      "https://images.unsplash.com/photo-1575809983151-38458542a6fc?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fGFuaW1hbCUyMGRlJTIwZXN0aW1hJUMzJUE3JUMzJUEzb3xlbnwwfDJ8MHx8fDA%3D",
    personalidade: "Energético e carinhoso",
    cadastrante_id: 101,
    localizacao: { lat: -23.5505, lng: -46.6333 },
    status: "Disponível",
  },

  animal2: {
    id: 2,
    nome: "Mia k.",
    especie: "Gato",
    raca: "Siamês",
    idade: 2,
    sexo: "F",
    descricao: "Gatinha tranquila que adora um bom colo.",
    fotoURL:
      "https://images.unsplash.com/photo-1577980906127-4ea7faa2c6f0?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGNhdHxlbnwwfDJ8MHx8fDA%3D",
    personalidade: "Calma e afetuosa",
    cadastrante_id: 102,
    localizacao: { lat: -22.9068, lng: -43.1729 },
    status: "Adotado",
  },

  animal3: {
    id: 3,
    nome: "Perna Longa",
    especie: "Outro",
    raca: "Coelho Anão",
    idade: 1,
    sexo: "M",
    descricao: "Coelhinho muito fofo, ideal para apartamentos.",
    fotoURL:
      "https://images.unsplash.com/photo-1705587226186-bbb26978b7a0?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJ1bm55fGVufDB8MnwwfHx8MA%3D%3D",
    personalidade: "Tímido, mas curioso",
    cadastrante_id: 103,
    localizacao: { lat: -19.9167, lng: -43.9345 },
    status: "Disponível",
  },
  animal4: {
    id: 4,
    nome: "Rex",
    especie: "Cachorro",
    raca: "Pastor Alemão",
    idade: 4,
    sexo: "M",
    descricao:
      "Cachorro inteligente, ótimo para atividades físicas e proteção.",
    fotoURL:
    "https://images.unsplash.com/photo-1561495376-dc9c7c5b8726?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGRvZ3xlbnwwfDJ8MHx8fDA%3D",
    personalidade: "Leal e protetor",
    cadastrante_id: 104,
    localizacao: { lat: -23.5505, lng: -46.6333 },
    status: "Disponível",
  },

  animal5: {
    id: 5,
    nome: "Maggie",
    especie: "Cachorro",
    raca: "Beagle",
    idade: 3,
    sexo: "F",
    descricao: "Cachorra curiosa, adora explorar novos lugares.",
    fotoURL:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.TZYl7mK8Ml21wUcseLYAPgHaHa%26pid%3DApi&f=1&ipt=c2f753524710729d4802e7444b36ab6a62d8a9e33a7f5ec1417d95972f40151c&ipo=images",
    personalidade: "Curiosa e independente",
    cadastrante_id: 105,
    localizacao: { lat: -22.9035, lng: -43.2075 },
    status: "Adotado",
  },

  animal6: {
    id: 6,
    nome: "Buddy",
    especie: "Cachorro",
    raca: "Golden Retriever",
    idade: 2,
    sexo: "M",
    descricao: "Cachorro alegre, adora brincar com crianças e outros animais.",
    fotoURL:
      "https://images.unsplash.com/photo-1737309657220-025e96d413fe?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGRvZyUyMDMwMHgzMDB8ZW58MHwyfDB8fHww",
    personalidade: "Amigável, ativo",
    cadastrante_id: 106,
    localizacao: { lat: -21.7645, lng: -43.2333 },
    status: "Disponível",
  },

  animal7: {
    id: 7,
    nome: "Charlie",
    especie: "Cachorro",
    raca: "Cocker Spaniel",
    idade: 5,
    sexo: "M",
    descricao: "Cachorro calmo e carinhoso, adora ficar perto dos donos.",
    fotoURL:
      "https://images.unsplash.com/photo-1610328477500-6767d375fa7e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGRvZyUyMGJveGVyfGVufDB8MnwwfHx8MA%3D%3D",
    personalidade: "Carinhoso e tranquilo",
    cadastrante_id: 107,
    localizacao: { lat: -23.4567, lng: -46.6543 },
    status: "Disponível",
  },
};

/* Para cada animal dentro do json insere 
dentro da div um quadrado com as informações */
const inserirAnimais = (jsonApi) => {
  let boxAnimais = document.getElementById("container-animais");
  let objetoAnimais = Object.values(jsonApi);
  objetoAnimais.forEach((animal) => {
    // Transforma o obj em uma string codigicada para passar pelo parametro
    let animalStr = encodeURIComponent(JSON.stringify(animal));
    let conteudo = `
      <div class="container-animais-item">
      <div class="container-animais-item-overlay" onclick="abrirPopup('${animalStr}')"></div>
      <img class="animais-item-img" src="${animal.fotoURL}" alt="dog1">
      <h6 class="animais-item-text">Nome: ${animal.nome}</h6>
      <h6 class="animais-item-text">Raça: ${animal.raca}</h6>
      <h6 class="animais-item-text">Idade: ${animal.idade}</h6>
      </div>
    `;
    boxAnimais.innerHTML += conteudo;
  });
};

// Faz o overlay aparecer e insere o popup
function abrirPopup(animalStr) {
  /* Falta criar uma verificação se o animal é favorito ja
  para colocar o coração preenchido de vermelho */
  let overlay = document.getElementById("overlay");
  let body = document.getElementById("body");
  body.style.overflow = "hidden";
  overlay.style.display = "flex";
  let animalObj = JSON.parse(decodeURIComponent(animalStr)); // Descodifica a string
  overlay.innerHTML = `
    <div class="popup" onclick="event.stopPropagation()">
      <img src="${animalObj.fotoURL}" class="popup-img"/>
      <div class="popup-content">
        <i onclick="favoritar()" id="popup-btnFavoritar" class="popup-btnFavoritar fa-regular fa-heart"></i>
        <p class="popup-text"><b>Nome:</b> ${animalObj.nome}</p>
        <p class="popup-text"><b>Idade:</b> ${animalObj.idade}</p>
        <p class="popup-text"><b>Raca:</b> ${animalObj.raca}</p>
        <p class="popup-text"><b>Sexo:</b> ${animalObj.sexo}</p>
        <p class="popup-text"><b>Personalidade:</b> <br> ${animalObj.personalidade}</p>
        <p class="popup-text"><b>Descricao:</b> <br> ${animalObj.descricao}</p>
        <button id="popup-btnAdotar" onclick="adotar()">Adotar</button>
      </div>
    </div>
  `;
}

// Troca a cor do coração de favoritar
function favoritar() {
  /* Aqui dentro vai ser feito o processo de favoritar o animal
  na tabela de favoritos e de desfavoritar tambem */
  let heart = document.getElementById("popup-btnFavoritar");
  if (heart.classList.contains("fa-regular")) {
    heart.classList.replace("fa-regular", "fa-solid");
    heart.style.color = "#E31B23";
  }else {
    heart.classList.replace("fa-solid", "fa-regular");
    heart.style.color = "#000000";
  }
}

function adotar() {
    alert('Seu requerimento de adoção foi para aprovação! ');
}

// Faz o popup fechar quando clicar fora dele
function fecharPopup() {
  let overlay = document.getElementById("overlay");
  let body = document.getElementById("body");
  body.style.overflow = "";
  overlay.style.display = "none";

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
function abrirMenuFiltros() {
  let menu = document.getElementById("menu-filtros");
  let body = document.getElementById("body");
  body.style.overflow = "hidden";
  menu.classList.add("active")
}
function fecharMenuFiltros() {
  let menu = document.getElementById("menu-filtros");
  let body = document.getElementById("body");
  body.style.overflow = "scroll";
  menu.classList.remove("active")
}
// Inserindo os animais
inserirAnimais(exemploJsonApi);