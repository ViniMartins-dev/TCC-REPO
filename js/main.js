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
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.b0QF4aTYLdhrzmX2HkomBgHaHT%26pid%3DApi&f=1&ipt=ed0e750c8c018df5bc0b061f425a664dabc3eeb6a1dbb67e9e9fc1bc8484c8e9&ipo=images",
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
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.lk9fThZ_ekxDkSYN1SMeawHaFj%26pid%3DApi&f=1&ipt=f7f5e91e58594f081407c2065b661d9134fd8118c86276073447fece462a4ca5&ipo=images",
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
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.JxoPcGqX6exYFNAg750sjQHaG6%26pid%3DApi&f=1&ipt=c0e0c3084594f86d0d39e7ab30b57e821d463c938713deafc13d54ac81c6007c&ipo=images",
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
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.SS1ZH-ArlL0TA9dhRNt98wHaFS%26pid%3DApi&f=1&ipt=1334cc609ac2d782910de9e3029ff8105c01fc4963b4c60dcb2dbda490c9a3d2&ipo=images",
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
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.wv9eIefbFqs4ONjRsU7h9AHaGa%26pid%3DApi&f=1&ipt=d336ec39ba37f633e7d09c0eda62b4aec5ea9ab2d65c3f042b3c810cd39e56c8&ipo=images",
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
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.v3cm9_avR22fgszuni30WAHaJ4%26pid%3DApi&f=1&ipt=94f5b49ff080bf5d3c0a4468a226df7013cc48b37a4d5716b39a29f97f64a655&ipo=images",
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
      <p class="animais-item-text">Nome: ${animal.nome}</p>
      <p class="animais-item-text">Raça: ${animal.raca}</p>
      <p class="animais-item-text">Idade: ${animal.idade}</p>
      </div>
    `;
    boxAnimais.innerHTML += conteudo;
  });
};

// Faz o overlay aparecer e insere o popup
function abrirPopup(animalStr) {
  const overlay = document.getElementById("overlay");
  overlay.style.display = "flex";
  let animalObj = JSON.parse(decodeURIComponent(animalStr)); // Descodifica a string
  overlay.innerHTML = `
    <div class="popup" onclick="event.stopPropagation()">
      <img src="${animalObj.fotoURL}" class="popup-img"/>
      <p class="popup-text"><b>Nome:</b> ${animalObj.nome}</p>
      <p class="popup-text"><b>Idade:</b> ${animalObj.idade}</p>
      <p class="popup-text"><b>Raca:</b> ${animalObj.raca}</p>
      <p class="popup-text"><b>Sexo:</b> ${animalObj.sexo}</p>
      <p class="popup-text"><b>Personalidade:</b> <br> ${animalObj.personalidade}</p>
      <p class="popup-text"><b>Descricao:</b> <br> ${animalObj.descricao}</p>
    </div>
  `;
}

// Faz o popup fechar quando clicar fora dele
function fecharPopup() {
  const overlay = document.getElementById("overlay");
  overlay.style.display = "none";
}

// Inserindo os animais
inserirAnimais(exemploJsonApi);