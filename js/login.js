class Pagina {
  constructor() {
  }
  irParaLogin() {
    window.location.href = "#cadastro"
  }
  irParaHome() {
    window.location.href = "index.html"
  }
}
const pagina = new Pagina();

class Usuario {
  constructor() {
    this.nome_fantasia = null;
    this.email = null;
    this.telefone = null;
    this.senha = null;
    this.cnpj = null;
    this.cpf = null;
    this.latitude = null;
    this.longitude = null;
  }
  inserirInformacoes(tipo, obj) {
    this.resetarInformacoes()
    this.nome_fantasia = obj.nome_fantasia;
    this.email = obj.email;
    this.telefone = obj.telefone;
    this.senha = obj.senha;
    this.latitude = obj.latitude; //mocado
    this.longitude = obj.longitude;//mocado
    if (tipo === "tutor") {
      this.cpf = obj.cpf;
    } else {
      this.cnpj = obj.cnpj;
    }
  }
  resetarInformacoes() {
    this.nome_fantasia = "";
    this.email = "";
    this.telefone = "";
    this.senha = "";
    this.cpf = "";
    this.cnpj = "";
    this.sobrenome = "";
    this.data_nascimento = "";  
  }
  pegarInformacoesProtetor() {
    return {
      nome_fantasia: this.nome_fantasia,
      email: this.email,
      telefone: this.telefone,
      senha: this.senha,
      cnpj: this.cnpj,
      latitude: this.latitude,
      longitude: this.longitude
    }
  }
  pegarInformacoesTutor() {
    return {
      nome: this.nome_fantasia,
      sobrenome: "mocado",
      email: this.email,
      telefone: this.telefone,
      senha: this.senha,
      cpf: this.cpf,
      data_nascimento: "2000-01-01", // mocado
      latitude: this.latitude,
      longitude: this.longitude
    }
  }
}
const usuario = new Usuario()
//Sempre vai iniciar o site na parte de login
location.href ="#cadastro";
class FormularioCadastro {
  constructor() {
    this.inputTipo = document.getElementById('tipo');
    this.inputNome = document.getElementById('nome-cadastro');    
    this.inputTel = document.getElementById('tel-cadastro');
    this.inputEmail = document.getElementById('email-cadastro'); 
    this.inputSenha = document.getElementById('pass-cadastro');
    this.inputCPF = document.getElementById("cpf")
    this.inputCNPJ = document.getElementById("cnpj")

    this.boxInputCPF = document.getElementById('cpfInp');
    this.boxInputCNPJ = document.getElementById('cnpjInp');

    this.formulario = document.getElementById('form-cadastro')
    this.selectTipo = document.getElementById('tipo');
    this.informacoes = {
      tipo : "tutor",
    }
  }
  definirThisTipo(value) {
    this.informacoes.tipo = value;
  }
  aparecerInputCPF() {
    this.boxInputCPF.style.display = "block"
  }
  adicionaObservadorSelectTipo() {
    this.selectTipo.addEventListener('change', (event) => {
        let tipo = event.currentTarget.value;
        this.definirThisTipo(tipo)
        if(tipo === 'tutor') {
          this.trocaSelectTipo(this.boxInputCPF, this.boxInputCNPJ)
        } else if(tipo === 'protetor') {
          this.trocaSelectTipo(this.boxInputCNPJ, this.boxInputCPF)
        }
    })
  }
  trocaSelectTipo(inputNovo, inputVelho) {
    inputVelho.style.display = "none";
    inputNovo.style.display = "block"
  }
  definirThisInformacoes() {
    let informacoes = {
      tipo: this.inputTipo.value.trim(),
      nome_fantasia: this.inputNome.value.trim(),
      email: this.inputEmail.value.trim(),
      telefone: this.inputTel.value.trim(),
      senha: this.inputSenha.value.trim(),
      cnpj: "",
      cpf: "",
      latitude: "-23.47000000",
      longitude: "-46.45610000"
    }
    if (this.informacoes.tipo == "protetor") {
      informacoes.cnpj = this.inputCNPJ.value.trim();
    } else {
      informacoes.cpf = this.inputCPF.value.trim();
    }
    usuario.inserirInformacoes(informacoes.tipo, informacoes)
  }
  async cadastrarProtetor() {
    try {
      const resposta = await fetch("http://localhost:3000/usuario/protetor", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario.pegarInformacoesProtetor())
      });
      if (!resposta.ok) {
        throw new Error("Erro ao cadastrar protetor");
      }
    } catch (erro) {
      console.error("Erro na requisição:", erro);
    }
  }
  async cadastrarTutor() {
    try {
      const resposta = await fetch("http://localhost:3000/usuario/tutor", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario.pegarInformacoesTutor())
      });
      if (!resposta.ok) {
        let erro = await resposta.json()
        throw new Error(erro.erro);
      }
    } catch (erro) {
      console.error("Erro na requisição:", erro);
    }
  }
  adicionaObservadorSubmitForm() {
    this.formulario.addEventListener('submit', (event) => {
      event.preventDefault(); //trava o envio para podermos manipular os dados
      this.enviarForm();
    })
  }
  enviarForm() {
    this.definirThisInformacoes();
    if(this.informacoes.tipo === 'tutor' ) {
      this.cadastrarTutor()
      pagina.irParaLogin()
    } else {
      this.cadastrarProtetor()
      pagina.irParaLogin()
    }
  }
}
const formularioCadastro = new FormularioCadastro();
// para nao ficar sem nenhum campo adiciona o campo cpf por padrao
formularioCadastro.aparecerInputCPF()
formularioCadastro.adicionaObservadorSelectTipo()
formularioCadastro.adicionaObservadorSubmitForm()

class FormularioLogin {
  constructor() {
   this.inputEmail = document.getElementById("email-login")
   this.inputSenha = document.getElementById("senha-login")
  }
  pegarValorInputs() {
    return {
      email: this.inputEmail.value.trim(),
      senha: this.inputSenha.value.trim()
    }
  }
  async login(obj) {
    try {
      const response = await fetch('http://localhost:3000/usuario/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: obj.email,
          senha: obj.senha
        })
      });
      if (!response.ok) throw new Error('Erro ao fazer login.');
      const data = await response.json(); 
      console.log(data.payload)
      cadastrarCookie(decodificaObjEmStr({
        id: data.payload.id,
        tipo: data.payload.tipo,
        email: data.payload.email
      }));
    } catch (error) {
        console.error(error);
    }
  }
  adicionarObsevadorSubmitForm() {
    document.getElementById('form-login').addEventListener('submit', (event) => {
      event.preventDefault(); 
      this.login(this.pegarValorInputs())  
      // porque nao estva dando tempo de cadastrar cookie antes de ir para home
      setTimeout(() => {
        pagina.irParaHome();
      }, 100);
    })
  }
}
const formularioLogin = new FormularioLogin();
formularioLogin.adicionarObsevadorSubmitForm()

function decodificaObjEmStr(obj) {
  return encodeURIComponent(JSON.stringify(obj))
}
function cadastrarCookie(str) {
  document.cookie = `usuario=${str}; path=/; max-age=3600`;
  console.log(document.cookie)
}
