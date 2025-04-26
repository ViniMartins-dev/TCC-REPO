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
};
let contador = 0;
const inserirAnimais = (jsonApi) => {
  let boxAnimais = document.getElementById("container-animais");
  let objetoAnimais = Object.values(jsonApi);
  objetoAnimais.forEach((animal) => {
    // Transforma o obj em uma string codigicada para passar pelo parametro
    let animalStr = encodeURIComponent(JSON.stringify(animal));
    contador ++;
    let conteudo = `
      <div class="container-animais-item">
        <img class="animais-item-img" src="${animal.fotoURL}" alt="dog1">
        <div class="item-content">
          <i class="btnFavoritar fa-solid fa-heart" onclick="favoritar(${contador})" id="btnFavoritar${contador}"></i>
          <h6 class="animais-item-text">Nome: ${animal.nome}</h6>
          <h6 class="animais-item-text">Raça: ${animal.raca}</h6>
          <h6 class="animais-item-text">Idade: ${animal.idade}</h6>
        </div>
      </div>
    `;
    boxAnimais.innerHTML += conteudo;
  });
};
// Troca a cor do coração de favoritar
function favoritar(id) {
  /* Aqui dentro vai ser feito o processo de favoritar o animal
  na tabela de favoritos e de desfavoritar tambem */
  let idString = "btnFavoritar" + id;
  let heart = document.getElementById(idString);
  if (heart.classList.contains("fa-regular")) {
    heart.classList.replace("fa-regular", "fa-solid");
    heart.style.color = "#E31B23";
  }else {
    heart.classList.replace("fa-solid", "fa-regular");
    heart.style.color = "#000000";
  }
}
inserirAnimais(exemploJsonApi);