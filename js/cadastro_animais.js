class PaginaODT {
  constructor() {
    this.body = document.getElementById("body");
    this.popup = document.getElementById("popup-resize");
    this.btnAddImg = document.getElementById("img-buton");
    this.imgInputfile = document.getElementById("img-input");
  }
}
const pagina = new PaginaODT();

class Sidebar {
  constructor() {
    this.sidebar = document.getElementById("sidebar");
    this.body = document.getElementById("body");
  }
  abrir() {
    this.body.style.overflow = "hidden"
    this.sidebar.style.display = "flex";
  }
  fechar() {
    this.body.style.overflow = "scroll"
    this.sidebar.style.display = "none";
  }
}
const sidebar = new Sidebar();

function irParaHome() {
  window.location.href = "./index.html"
}

function adicionaObservadorBtnAddImg() {
  pagina.btnAddImg.addEventListener("click", () => {
    pagina.imgInputfile.click();
  })
}
adicionaObservadorBtnAddImg()

let cropper;
class RecortadorImagem {
  constructor() {
    this.file; 
    this.image;
    this.imgRecortada = document.getElementById("resized-img");
  }
  definirThisImage() {
    this.image = document.getElementById("img-container__item")
  }
  adicionaObservadorNoInputFile() {
    document.getElementById("img-input").addEventListener("change", (e) => {
      this.definirThisImage()
      const files = e.target.files;
      if (files && files.length > 0) {
        this.file = files[0];
        this.dispararRecortador();
      }
    });
  }
  dispararRecortador() {
    this.abrirPopupRecortador();
    this.trocarSrcDaImagem(URL);
    this.verificaSeHaCropper()
    this.image.onload = () => {
      this.criaNovaInstaciaCropper();
    };
  }
  abrirPopupRecortador () {
      pagina.body.style.overflow = "hidden";
      pagina.popup.style.display = "flex";
  }
  trocarSrcDaImagem(URL) {
    this.definirThisImage();
    if (URL) {
      this.image.src = URL.createObjectURL(this.file);
    } else if (FileReader) {
      // Alternativa para navegadores antigos
      const reader = new FileReader();
      reader.onload = function (e) {
        this.image.src = e.target.result;
      };
      reader.readAsDataURL(this.file);
    }
  }
  verificaSeHaCropper() {
    if (cropper) {
      cropper.destroy();
    }
  }
  criaNovaInstaciaCropper() {
    this.definirThisImage()
    cropper = new Cropper(this.image, {
      aspectRatio: 300 / 298, 
      viewMode: 1, 
      guides: false, 
      background: false, 
      cropBoxResizable: false, 
      dragMode: "move", 
      toggleDragModeOnDblclick: false, 
    });
  }
  adicionarObservadorNoBtnOk() {
    let btn = document.getElementById("popup-resize__btn");
    btn.addEventListener("click", () => {
      this.fecharPopupRecortador();
      // Verifica se o cropper esta inicializado
      if (cropper) {
        const canvas = cropper.getCroppedCanvas();
        if (canvas) {
          this.tranformaCanvasEmBlob(canvas)
        }
      }
    });
  }
  tranformaCanvasEmBlob(canvas) {
    canvas.toBlob(
      (blob) => {
        const url = URL.createObjectURL(blob); // Cria um URL temporario para imagem recortada
        this.defineSrcImgRecortada(url)
      },
      "image/jpeg",
      0.95
    );
  }
  defineSrcImgRecortada(url) {
    this.imgRecortada.src = url;
  }
  fecharPopupRecortador() {
      pagina.popup.style.display = "none"; 
      pagina.body.style.overflow = "";
  }
}
const recortador = new RecortadorImagem();
recortador.adicionaObservadorNoInputFile()
recortador.adicionarObservadorNoBtnOk()


document.getElementById('tipo').addEventListener('change', function() {
  let boxOptions = document.getElementById("raca");
  const tipoSelect = this.value;

  let options;
  if (tipoSelect == "cachorro") {
    options = `
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
    `
  } else if (tipoSelect == "gato") {
    options = `
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
    `
  } else {
    options = `

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
    `
  }
  boxOptions.innerHTML = options
}
)
