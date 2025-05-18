function abrirMenu() {
  let sidebar = document.getElementById("sidebar");
  document.body.style.overflow = "hidden"
  sidebar.style.display = "flex";
}
function fecharMenu() {
  let sidebar = document.getElementById("sidebar");
  document.body.style.overflow = "scroll"
  sidebar.style.display = "none";
}
function irParaHome() {
  window.location.href = "./index.html"
}


// EXEMPLO DE API 

// const cardSolicita =  async (id) => {
//   try {
//     const rotaAPI = await fetch(`/cadastrados/${id}`, {method: 'GET'});
  
//     if(!rotaAPI.ok) {
//     console.log('ERRO na busca dos dados !');
//     return;
//   }

//   const dados = await rotaAPI.json();
//   const card = document.getElementById('card');
//   card.innerHTML = `
//     <div>
//         <p>visualização: ${dados.nome}, ${dados.especie}, ${dados.Usernome}</p>
//     </div>
// `
// } catch(e) {
//   console.log('Erro em encontrar solicitação')
// }

// }
  
