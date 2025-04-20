function validarCPF(cpf) {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]+/g, '');

    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
        return false;
    }

    // Verifica se o CPF é uma sequência de números iguais (ex: 111.111.111-11)
    if (/^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    // Calculando os dois dígitos verificadores
    let soma = 0;
    let peso = 10;
    
    // Calcula o primeiro dígito verificador
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * peso--;
    }

    let primeiroDigito = (soma * 10) % 11;
    if (primeiroDigito === 10 || primeiroDigito === 11) {
        primeiroDigito = 0;
    }

    if (parseInt(cpf.charAt(9)) !== primeiroDigito) {
        return false;
    }

    soma = 0;
    peso = 11;

    // Calcula o segundo dígito verificador
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * peso--;
    }

    let segundoDigito = (soma * 10) % 11;
    if (segundoDigito === 10 || segundoDigito === 11) {
        segundoDigito = 0;
    }

    if (parseInt(cpf.charAt(10)) !== segundoDigito) {
        return false;
    }

    // CPF válido
    return true;
}

module.exports = validarCPF;
