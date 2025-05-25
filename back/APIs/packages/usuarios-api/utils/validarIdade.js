function verificarIdade(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);

    // Calcular a diferença de anos
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    // Ajustar idade se o aniversário ainda não ocorreu neste ano
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }

    if (idade < 18) {
        return false; // Menor de idade
    } else if (idade > 120) {
        return false; // Idade inválida
    } else {
        return true; // Maior de idade
    }
}

module.exports = verificarIdade;