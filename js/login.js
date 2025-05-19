

//Sempre vai iniciar o site na parte de login
location.href ="#cadastro";

document.getElementById('tipo').addEventListener('change', function() {
    let tipo = this.value;

    let cpfInp = document.getElementById('cpfInp');
    let cnpjInp = document.getElementById('cnpjInp');

    cpfInp.style.display = 'none';
    cnpjInp.style.display = 'none';

    if(tipo === 'tutor') {
        cpfInp.style.display = 'block';
    } else if(tipo === 'protetor') {
        cnpjInp.style.display = 'block';
    }
})

//adciona um evento no formulario, para quando der submit
document.getElementById('form-cadastro').addEventListener('submit', function(event) {
    event.preventDefault(); //trava o envio para podermos manipular os dados

    //pega os elementos com esses IDs
    let tipo = document.getElementById('tipo').value;

    let nome = document.getElementById('nome-cadastro');    
    let tel = document.getElementById('tel-cadastro');
    let email = document.getElementById('email-cadastro'); 
    let senha = document.getElementById('pass-cadastro');

    let url = '';
    //faz um objeto para pegar os valores dos dados passados
    const dados = {
        tipo: tipo,
        nome: nome.value.trim(),
        telefone: tel.value.trim(),
        email: email.value.trim(),
        senha: senha.value.trim()
    };

    //faz a verificação se o usuario é um tutor ou protetor
    if(tipo === 'tutor' ) {
        let cpf = document.getElementById('cpf');
        dados.cpf = cpf.value.trim();

        url = '/usuario/tutor'

    } else if (tipo === 'protetor') {
        let cnpj = document.getElementById('cnpj');
        dados.cnpj = cnpj.value.trim();

        url = '/usuario/protetor'
    }
    
    //mandando os dados pela API
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })

    //verifica esses dados transformando em Json
    .then(response => {
        if(!response.ok) throw new Error('Erro no envio dos dados');
        return response.json();
    })
    .then(result => {
        alert('Dados enviados com sucesso !!!'); //se for bem sucessido envia um alerta
    })
    .catch(e => {//pega todo tipo de erro, mostra no console e emite um alerta
        console.error('Erro: ', e);
        alert('Erro ao enviar dados.');
    })

})

document.getElementById('form-login').addEventListener('submit', function(event) {
    event.preventDefault(); //trava o envio para podermos manipular os dados

    let email = document.getElementById('email-login').value.trim();
    let senha = document.getElementById('senha-login').value.trim();

    fetch('', {
        method: POST,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email, 
            senha: senha
        })
    })

    .then(response => {
        if(!response.ok) throw new Error('Erro na validação de login');
        return response.json();
    })
    .then(result => {
        alert('Validação bem sucedida !!!');
    })
    .catch(e => {
        console.error('Erro:', e);
        alert('Login ou Senha incorreta !')
    }) 

} )



