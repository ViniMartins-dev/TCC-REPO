class Pagina {
  constructor() {
  }
  irParaLogin() {
    window.location.href = "#cadastro"
  }
  irParaHome() {
    window.location.href = "home.html"
  }
}
const pagina = new Pagina();

class Usuario {
  constructor() {
    this.nome = null;
    this.sobrenome = null;
    this.nome_fantasia = null;
    this.email = null;
    this.telefone = null;
    this.senha = null;
    this.data_nascimento = null;
    this.cnpj = null;
    this.cpf = null;
    this.latitude = null;
    this.longitude = null;
  }
  inserirInformacoes(tipo, obj) {
    this.resetarInformacoes()
    this.nome = obj.nome;
    this.sobrenome = obj.sobrenome;
    this.nome_fantasia = obj.nome;
    this.email = obj.email;
    this.data_nascimento = obj.data;
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
    this.nome = "";
    this.sobrenome = "";
    this.nome_fantasia = "";
    this.email = "";
    this.telefone = "";
    this.data_nascimento = "";
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
      nome: this.nome,
      sobrenome: this.sobrenome,
      email: this.email,
      telefone: this.telefone,
      senha: this.senha,
      cpf: this.cpf,
      data_nascimento: this.data_nascimento,
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
    this.inputSobrenome = document.getElementById('sobrenome-cadastro');    
    this.inputTel = document.getElementById('tel-cadastro');
    this.inputEmail = document.getElementById('email-cadastro'); 
    this.inputSenha = document.getElementById('pass-cadastro');
    this.inputData = document.getElementById('data-cadastro');
    this.inputCPF = document.getElementById("cpf")
    this.inputCNPJ = document.getElementById("cnpj")
    
    this.erroEmail = document.getElementById("erroEmail");
    this.erroCNPJ = document.getElementById("erroCNPJ")
    this.erroCPF = document.getElementById("erroCPF")
    this.erroTel = document.getElementById("erroTel")
    this.erroData = document.getElementById("erroData")
    this.erroLogin = document.getElementById("erroLogin")

    this.boxInputCPF = document.getElementById('cpfInp');
    this.boxInputCNPJ = document.getElementById('cnpjInp');

    this.formulario = document.getElementById('form-cadastro')
    this.selectTipo = document.getElementById('tipo');
    this.informacoes = {
      tipo : "tutor",
    }
    this.aparecerInputCPF()
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
          this.inputSobrenome.style.display = "flex"
          this.inputSobrenome.required = true
          this.inputData.style.display = "flex"
          this.inputData.required = true
        } else if(tipo === 'protetor') {
          this.trocaSelectTipo(this.boxInputCNPJ, this.boxInputCPF)
          this.inputSobrenome.style.display = "none"
          this.inputSobrenome.required = false
          this.inputData.style.display = "none"
          this.inputData.required = false
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
      nome: this.inputNome.value.trim(),
      sobrenome: this.inputSobrenome.value.trim(),
      data: this.inputData.value.trim(),
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
      const resposta = await fetch("http://localhost:3000/usuario/protetor", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario.pegarInformacoesProtetor())
      });
      let dados = await resposta.json()
      if (dados.erro == "CNPJ inválido.") {
        this.erroCNPJ.classList.remove("errorOFF");
        this.erroCNPJ.textContent = "Digite um CNPJ valido"
        return false
      } else if (dados.erro == "Validation error: Validation isEmail on email failed") {
        this.erroEmail.classList.remove("errorOFF");
        this.erroEmail.textContent = "Digite um e-mail válido"
        return false
      } 
    return true

  }
  async cadastrarTutor() {
      const resposta = await fetch("http://localhost:3000/usuario/tutor", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario.pegarInformacoesTutor())
      });
      let dados = await resposta.json()
      if (dados.erro == "Idade inválida.") {
        this.erroData.textContent = "Voce deve ter entre 18 anos e 120 anos"
        return false
      } else if (dados.erro == "Validation error: Validation isEmail on email failed") {
        this.erroEmail.classList.remove("errorOFF");
        this.erroEmail.textContent = "Digite um e-mail válido"
        return false
      } else if (dados.erro == "CPF inválido.") {
        this.erroCPF.classList.remove("errorOFF");
        this.erroCPF.textContent = "CPF invalido"
        return false
      }
      return true
  }
  adicionaObservadoresDeErro() {
    this.inputEmail.addEventListener('invalid', (e) => {
      e.preventDefault(); // evita o balãozinho do navegador
      this.erroEmail.classList.remove("errorOFF")
      this.erroEmail.textContent = "Digite um e-mail válido.";
    });
    this.inputEmail.addEventListener('input', () => {
      if (this.inputEmail.checkValidity()) {
      this.erroEmail.classList.add("errorOFF")
        this.erroEmail.textContent = "";
      }
    });

    this.inputCPF.addEventListener('invalid', (e) => {
      e.preventDefault(); // evita o balão do navegador
      this.erroCPF.classList.remove("errorOFF")
      this.erroCPF.textContent = "CPF deve conter 11 números.";
    });

    this.inputCPF.addEventListener('input', () => {
      const cpfNumeros = this.inputCPF.value.replace(/\D/g, '');
      if (cpfNumeros.length === 11) {
        this.erroCPF.classList.add("errorOFF")
        this.erroCPF.textContent = "";
      } else {
        this.erroCPF.classList.remove("errorOFF")
        this.erroCPF.textContent = "CPF invalido"
      }
    });

    this.inputCNPJ.addEventListener('invalid', (e) => {
      e.preventDefault(); // evita o balão do navegador
      this.erroCNPJ.classList.remove("errorOFF")
      this.erroCNPJ.textContent = "CNPJ deve conter 14 números.";
    });

    this.inputCNPJ.addEventListener('input', () => {
      const cnpjNumeros = this.inputCNPJ.value.replace(/\D/g, '');
      if (cnpjNumeros.length === 14) {
        this.erroCNPJ.classList.add("errorOFF")
        this.erroCNPJ.textContent = "";
      } else {
        this.erroCNPJ.classList.remove("errorOFF")
        this.erroCNPJ.textContent = "CNPJ invalido"
      }
    });

    this.inputTel.addEventListener('invalid', (e) => {
      e.preventDefault(); // evita o balão do navegador
      this.erroTel.classList.remove("errorOFF")
      this.erroTel.textContent = "Telefone deve conter 10 ou 11 números.";
    });
    this.inputTel.addEventListener('input', () => {
      const telNumeros = this.inputTel.value.replace(/\D/g, '');
      if (telNumeros.length === 10 || telNumeros.length === 11) {
        this.erroTel.classList.add("errorOFF")
        this.erroTel.textContent = "";
      } else {
        this.erroTel.classList.remove("errorOFF")
        this.erroTel.textContent = "Telefone deve ter 11 caracteres";
      }
    });
    
    this.inputData.addEventListener('invalid', (e) => {
      e.preventDefault(); // evita o balão do navegador
      const idade = calcularIdade(this.inputData.value);
      this.erroData.classList.add("errorOFF")
      if (!this.inputData.value) {
        this.erroData.classList.remove("errorOFF")
        this.erroData.textContent = "Informe sua data de nascimento.";
      } else if (idade < 18) {
        this.erroData.classList.remove("errorOFF")
        this.erroData.textContent = "Idade minima 18";
      } else if (idade > 120) {
        this.erroData.classList.remove("errorOFF")
        this.erroData.textContent = "Idade maxima 120";
      }
    });

    this.inputData.addEventListener('input', () => {
      const data = this.inputData.value;
      const idade = calcularIdade(data);
      this.erroData.classList.add("errorOFF")
      if (idade < 18) {
        this.erroData.classList.remove("errorOFF")
        this.erroData.textContent = "Idade minima 18";
      } else if (idade > 120) {
        this.erroData.classList.remove("errorOFF")
        this.erroData.textContent = "Idade maxima 120";
      }
    });
  }
  adicionaObservadorSubmitForm() {
    this.formulario.addEventListener('submit', (event) => {
      event.preventDefault(); //trava o envio para podermos manipular os dados
      this.enviarForm();
    })
  }
  async enviarForm() {
    this.definirThisInformacoes();
    if(this.informacoes.tipo === 'tutor' ) {
      if (await this.cadastrarTutor()) {
        pagina.irParaLogin()
      }
    } else {
      if (await this.cadastrarProtetor()) {
        pagina.irParaLogin()
      }
    }
  }
}
const formularioCadastro = new FormularioCadastro();
// para nao ficar sem nenhum campo adiciona o campo cpf por padrao
formularioCadastro.aparecerInputCPF()
formularioCadastro.adicionaObservadorSelectTipo()
formularioCadastro.adicionaObservadorSubmitForm()
formularioCadastro.adicionaObservadoresDeErro()

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
      const data = await response.json(); 
      if (data.erro == "Usuário não encontrado.")  {
        formularioCadastro.erroLogin.textContent = "Usuario não encontrado"
        return false
      } else if (data.erro == "Senha incorreta.") {
        formularioCadastro.erroLogin.textContent = "Senha incorreta"
        return false
      }
      cadastrarCookie(decodificaObjEmStr({
        id: data.payload.id,
        nome_fantasia: data.payload.nome_fantasia,
        nome: data.payload.nome,
        sobrenome: data.payload.sobrenome,
        tipo: data.payload.tipo,
        email: data.payload.email,
        telefone: data.payload.telefone,
        cpf: data.payload.cpf,
        cnpj: data.payload.cnpj,
        token: data.token
      }));
     return true
  }

  adicionarObsevadorSubmitForm() {
    document.getElementById('form-login').addEventListener('submit', (event) => {
      event.preventDefault(); 
      this.enviar()
    })
  }
  async enviar() {
      let verificacao = await this.login(this.pegarValorInputs())
      if (verificacao) {
        pagina.irParaHome()
      }
  }
}
const formularioLogin = new FormularioLogin();
formularioLogin.adicionarObsevadorSubmitForm()

function calcularIdade(dataStr) {
  const hoje = new Date();
  const nascimento = new Date(dataStr);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();
  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }
  return idade;
}

function decodificaObjEmStr(obj) {
  return encodeURIComponent(JSON.stringify(obj))
}
function cadastrarCookie(str) {
  document.cookie = `usuario=${str}; path=/;`;
}
