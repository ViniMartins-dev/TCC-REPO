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

const infoPerfil = async () => {
  try {
    let perfilUser = await fetch('/usuario', {method: 'GET'})
    
    if(!perfilUser.ok) {
      console.log('Erro ao encontrar dados do Usuário');
      return;
    }

    let dados = await perfilUser.json();

    let nomeUs = document.getElementById('nome-user');
    let tel = document.getElementById('tel-user');

    let nome;

    if(dados.tipo === 'tutor') {
      nome = dados.nome 
    } else if(dados.tipo === 'protetor') {
      nome = dados.nome_fantasia 
    } else {
      console.log('Nome não encontrado !!!')
    }
    
    nomeUs.textContent = nome;
    tel.textContent = dados.telefone;
    
  }catch(e) {
    console.log('Perfil não encontrado');
  }

}

window.addEventListener('load', infoPerfil);
