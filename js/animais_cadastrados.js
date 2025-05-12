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
    contador++;
    let conteudo = `
      <div class="container-animais-item">
        <img class="animais-item-img" src="${animal.fotoURL}" alt="dog1">
        <div class="item-content">
          <div class="box-icons">
            <div class="box-icon edit" onclick="abrirPopupEditar()">
              <i class="icon fa-solid fa-pen-to-square"></i>
            </div>
            <div class="box-icon delete" onclick="abrirPopupDeletar()">
              <i class="icon fa-solid fa-trash"></i>
            </div>
          </div>
          <h6 class="animais-item-text">Nome: ${animal.nome}</h6>
          <h6 class="animais-item-text">Raça: ${animal.raca}</h6>
          <h6 class="animais-item-text">Idade: ${animal.idade}</h6>
        </div>
      </div>
    `;
    boxAnimais.innerHTML += conteudo;
  });
};

inserirAnimais(exemploJsonApi);

function abrirMenu() {
  let sidebar = document.getElementById("sidebar");
  let body = document.getElementById("body");
  body.style.overflow = "hidden";
  sidebar.style.display = "flex";
}
function fecharMenu() {
  let sidebar = document.getElementById("sidebar");
  let body = document.getElementById("body");
  body.style.overflow = "scroll";
  sidebar.style.display = "none";
}

function irParaHome() {
  window.location.href = "./index.html";
}

function abrirPopupDeletar() {
  let popup = document.getElementById("popupDeletar");
  popup.style.display = "flex";
  let body = document.getElementById("body");
  body.style.overflow = "hidden";
}
function fecharPopupDeletar() {
  let popup = document.getElementById("popupDeletar");
  popup.style.display = "none";
  let body = document.getElementById("body");
  body.style.overflow = "auto";
}

function abrirPopupEditar() {
  let popup = document.getElementById("popupEditar");
  let body = document.getElementById("body");
  body.style.overflow = "hidden";
  let tipo = "cachorro";
  // Troca as opçoes de raça de acordo com o tipo
  if (tipo == "coelho") {
    popup.innerHTML = `
      <div class="popupEditar-content">
        <h1>Editar</h1>
        <label for="nome">Nome:</label>
        <input type="text" id="nome" value="$nome">
        
        <label for="racas">Escolha a raça:</label>
        <select id="racas" name="racas">
          <option value="Holland Lop">Holland Lop</option>
          <option value="Angorá">Angorá</option>
          <option value="Mini Rex">Mini Rex</option>
          <option value="Netherland Dwarf">Netherland Dwarf</option>
          <option value="English Lop">English Lop</option>
          <option value="Flemish Giant">Flemish Giant</option>
          <option value="Himalayan">Himalayan</option>
          <option value="English Angora">English Angora</option>
          <option value="New Zealand">New Zealand</option>
          <option value="Lionhead">Lionhead</option>
          <option value="French Lop">French Lop</option>
          <option value="Californian">Californian</option>
        </select>
  
        <label for="box-sexos">Sexos:</label>
        <div class="box-sexos" id="box-sexos">  
          <div>
            <label for="sexo-m">Macho</label>
            <input type="radio" id="sexo-m" name="sexo" checked>
          </div>
          <div>
            <label for="sexo-f">Femea</label>
            <input type="radio" id="sexo-f" name="sexo">
          </div>
        </div>
        
        <label for="pesonalidade">Personalidade:</label>
        <input type="text" id="pesonalidade" value="$personalidade">
  
        <label for="descricao">Descrição:</label>
        <textarea type="text" id="descricao">$descricao</textarea>
  
        <div class="box-botoes">
          <div class="btn cancelar" onclick="fecharPopupEditar()">Cancelar</div>
          <div class="btn confirmar" onclick="editarAnuncio()">Editar</div>
        </div>
      </div>
    `;
  } else if (tipo == "cachorro") {
    popup.innerHTML = `
      <div class="popupEditar-content">
        <h1>Editar</h1>
        <label for="nome">Nome:</label>
        <input type="text" id="nome" value="$nome">
      
       <label for="racas">Escolha a raça:</label>
      <select id="racas" name="racas">
        <option value="Labrador Retriever">Labrador Retriever</option>
        <option value="Golden Retriever">Golden Retriever</option>
        <option value="Poodle">Poodle</option>
        <option value="Bulldog Francês">Bulldog Francês</option>
        <option value="Husky Siberiano">Husky Siberiano</option>
        <option value="Pastor Alemão">Pastor Alemão</option>
        <option value="Beagle">Beagle</option>
        <option value="Border Collie">Border Collie</option>
        <option value="Shih Tzu">Shih Tzu</option>
        <option value="Chihuahua">Chihuahua</option>
        <option value="Spitz Alemão">Spitz Alemão</option>
        <option value="Doberman">Doberman</option>
        <option value="Akita Inu">Akita Inu</option>
        <option value="Cocker Spaniel">Cocker Spaniel</option>
        <option value="Rottweiler">Rottweiler</option>
      </select>

  
        <label for="box-sexos">Sexos:</label>
        <div class="box-sexos" id="box-sexos">  
          <div>
            <label for="sexo-m">Macho</label>
            <input type="radio" id="sexo-m" name="sexo" checked>
          </div>
          <div>
            <label for="sexo-f">Femea</label>
            <input type="radio" id="sexo-f" name="sexo">
          </div>
        </div>
        
        <label for="pesonalidade">Personalidade:</label>
        <input type="text" id="pesonalidade" value="$personalidade">
  
        <label for="descricao">Descrição:</label>
        <textarea type="text" id="descricao">$descricao</textarea>
  
        <div class="box-botoes">
          <div class="btn cancelar" onclick="fecharPopupEditar()">Cancelar</div>
          <div class="btn confirmar" onclick="editarAnuncio()">Editar</div>
        </div>
      </div>
    `;
  } else {
    popup.innerHTML = `
      <div class="popupEditar-content">
        <h1>Editar</h1>
        <label for="nome">Nome:</label>
        <input type="text" id="nome" value="$nome">
        
      <label for="racas">Escolha a raça:</label>
      <select id="racas" name="racas">
        <option value="Persa">Persa</option>
        <option value="Siamês">Siamês</option>
        <option value="Maine Coon">Maine Coon</option>
        <option value="Ragdoll">Ragdoll</option>
        <option value="Bengal">Bengal</option>
        <option value="Sphynx">Sphynx</option>
        <option value="Burmese">Burmese</option>
        <option value="British Shorthair">British Shorthair</option>
        <option value="Abyssinian">Abyssinian</option>
        <option value="Scottish Fold">Scottish Fold</option>
        <option value="Oriental">Oriental</option>
        <option value="Devon Rex">Devon Rex</option>
        <option value="Birman">Birman</option>
        <option value="Russian Blue">Russian Blue</option>
        <option value="Exotic Shorthair">Exotic Shorthair</option>
      </select>


  
        <label for="box-sexos">Sexos:</label>
        <div class="box-sexos" id="box-sexos">  
          <div>
            <label for="sexo-m">Macho</label>
            <input type="radio" id="sexo-m" name="sexo" checked>
          </div>
          <div>
            <label for="sexo-f">Femea</label>
            <input type="radio" id="sexo-f" name="sexo">
          </div>
        </div>
        
        <label for="pesonalidade">Personalidade:</label>
        <input type="text" id="pesonalidade" value="$personalidade">
  
        <label for="descricao">Descrição:</label>
        <textarea type="text" id="descricao">$descricao</textarea>
  
        <div class="box-botoes">
          <div class="btn cancelar" onclick="fecharPopupEditar()">Cancelar</div>
          <div class="btn confirmar" onclick="editarAnuncio()">Editar</div>
        </div>
      </div>
    `;
  }
  popup.style.display = "flex";
}
function fecharPopupEditar() {
  let popup = document.getElementById("popupEditar");
  let body = document.getElementById("body");
  body.style.overflow = "auto";
  popup.style.display = "none";
}

// Fazer um delete na api
function deletarAnuncio() {
  let popup = document.getElementById("popupDeletar");
  popup.style.display = "none";
  alert("Seu anuncio foi deletado");
}
// Fazer um update na api
function editarAnuncio() {
  let popup = document.getElementById("popupEditar");
  popup.style.display = "none";
  alert("Seu anuncio foi editado");
}
