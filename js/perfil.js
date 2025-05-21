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
  linkCadastro.style.display = "none";
  boxLinks.innerHTML = `
      <a id="link" href="favoritos.html">Favoritos</a>
      <a id="link" href="perfil.html">Perfil</a>
  `
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

const infoPerfil = async () => {
  try {
    let perfilUser = await fetch('/usuario', {method: 'GET'}) //vai pegar as informações do usuário na rota
    
    if(!perfilUser.ok) {
      console.log('Erro ao encontrar dados do Usuário');//se não conseguir da um console com erro na busca dos dados  
      return;
    }

    let dados = await perfilUser.json(); //caso consiga os dados são enviados em Json aqui

    let nomeUs = document.getElementById('nome-user'); //pega o elemento com id nome-user 
    let tel = document.getElementById('tel-user'); //pega o elemento com id tel-user

    let nome; 

    //faz a verificação se é tutor ou protetor para puxar o nome do usuário
    if(dados.tipo === 'tutor') { 
      nome = dados.nome 
    } else if(dados.tipo === 'protetor') {
      nome = dados.nome_fantasia 
    } else {
      console.log('Nome não encontrado !!!')
    }
    
    //coloca as informações na pagina de perfil
    nomeUs.textContent = nome; 
    tel.textContent = dados.telefone;
    
  }catch(e) {
    console.log('Perfil não encontrado'); 
  }

}

window.addEventListener('load', infoPerfil); //execulta ao carregar a página 
