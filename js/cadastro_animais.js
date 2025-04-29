let cropper;
let popup = document.getElementById("popup-resize");
let body = document.getElementById("body");

// Dispara uma função sempre que o usuario selecionar um arquivo
document.getElementById("img-input").addEventListener("change", function (e) {
  const files = e.target.files; // Retorna uma lista dos arquivos selecionados
  // Verifica se há algum arquivo e se algum foi selecionado
  if (files && files.length > 0) {
    body.style.overflow = "hidden";
    popup.style.display = "flex";
    const image = document.getElementById("img-container__item");
    // Pega o primeiro arquivo da lista de arquivos selecionado
    const file = files[0];

    // Define o src da tag <img>
    if (URL) {
      image.src = URL.createObjectURL(file); // Cria uma URL temporaria para a imagem
    } else if (FileReader) {
      // Alternativa para navegadores antigos que nao suportam URL.createObjectURL
      const reader = new FileReader();
      reader.onload = function (e) {
        image.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
    // Verifica se há uma instancia cropper e apaga ela
    if (cropper) {
      cropper.destroy();
    }
    // Dispara uma função quando a imagem terminar de carregar
    image.onload = function () {
      // Cria uma nova instancia cropper
      cropper = new Cropper(image, {
        aspectRatio: 300 / 298, // Define o tamanho inicial da area de corte
        viewMode: 1, // Define o modo de visualização
        guides: false, // Desativa as guias
        background: false, // Desativa o background
        cropBoxResizable: false, // Desativa o redimencionamento da area de corte
        dragMode: "move", // Define o modo inicial para mexer a imagem
        toggleDragModeOnDblclick: false, // Impede que o user troque de modo
      });
    };
  }
});
// Dispara uma função quando o botao de OK for clicado
document
  .getElementById("popup-resize__btn")
  .addEventListener("click", function () {
    popup.style.display = "none"; 
    body.style.overflow = "";
    // Verifica se o cropper esta inicializado
    if (cropper) {
      // Pega a verção cortada da imagem
      const canvas = cropper.getCroppedCanvas();
      if (canvas) {
        // Tranforma a imagem recortada em um blob (um tipo de obj representado
        // por binarios) Dispara uma função para lidar com este blob
        canvas.toBlob(
          (blob) => {
            const url = URL.createObjectURL(blob); // Cria um URL temporario para imagem recortada
            // Define o src da <img> como o url
            let img = document.getElementById("resized-img");
            img.src = url;
          },
          "image/jpeg",
          0.95
        );
      }
    }
  });
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