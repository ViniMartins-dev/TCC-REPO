function pegarCookieUsuario() {
  const cookies = document.cookie.split('; ');
  for (let cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key === "usuario") return JSON.parse(decodeURIComponent(value));
  }
  return null;
}
const cookieUsuario = pegarCookieUsuario()

console.log(cookieUsuario)
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
function logout() {
  document.cookie = "usuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  irParaHome()
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
        <p id="email-user">Email: ${cookieUsuario.email}</p>
        <p id="tel-user">Tel: ${cookieUsuario.telefone}</p>
        <p id="cpf-user">CPF: ${cookieUsuario.cpf}</p>
    `
  } else {
    box.innerHTML = `
        <p id="email-user">Email: ${cookieUsuario.email}</p>
        <p id="tel-user">Tel: ${cookieUsuario.telefone}</p>
        <p id="cpf-user">CPF: ${cookieUsuario.cpf}</p>
    `
  }
}
colocarInfos()
