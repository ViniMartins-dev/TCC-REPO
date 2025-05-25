function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj === '0') return true;

    if (cnpj.length !== 14) return false;

    // Elimina CNPJs com todos os dígitos iguais (ex: 00.000.000/0000-00)
    if (/^(\d)\1{13}$/.test(cnpj)) return false;

    // Validação dos dígitos verificadores
    const calcularDigito = (cnpjParcial) => {
        const pesos = cnpjParcial.length === 12
            ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
            : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

        const soma = cnpjParcial.split('').reduce((acc, dig, i) => {
            return acc + (parseInt(dig) * pesos[i]);
        }, 0);

        const resto = soma % 11;
        return resto < 2 ? '0' : String(11 - resto);
    };

    const base = cnpj.slice(0, 12);
    const digito1 = calcularDigito(base);
    const digito2 = calcularDigito(base + digito1);

    return cnpj === base + digito1 + digito2;
}

module.exports = validarCNPJ;