const Animal = require('../../models/Animal');
const { Op } = require('sequelize');

const aplicarFiltros = (query) => {
    const filtros = {};
    console.log("raca: " + query.raca)

    // Filtro para 'especie' - busca exata
    if (query.especie) {
        filtros.especie = query.especie;
    }

    // Filtro para 'raca' - busca exata
    if (query.raca) {
        const racas = Array.isArray(query.raca)
            ? query.raca
            : query.raca.split(',').map(r => r.trim());

        filtros.raca = { [Op.in]: racas };
    }

    // Filtro para 'raca' - busca exata
    if (query.personalidade) {
        const personalidades = Array.isArray(query.personalidade)
            ? query.personalidade
            : query.personalidade.split(',').map(r => r.trim());

        filtros.personalidade = { [Op.in]: personalidades };
    }

    // Filtro para 'idadeMin' - maior ou igual
    if (query.idadeMin) {
        filtros.idade = { [Op.gte]: query.idadeMin }; // Maior ou igual
    }

    // Filtro para 'idadeMax' - menor ou igual
    if (query.idadeMax) {
        filtros.idade = { ...filtros.idade, [Op.lte]: query.idadeMax }; // Menor ou igual
    }

    // Filtro para 'sexo' - busca exata
    if (query.sexo) {
        filtros.sexo = query.sexo;
    }

    // Filtro para 'nome' - busca parcial
    if (query.nome) {
        filtros.nome = { [Op.like]: `%${query.nome}%` };
    }

    // Filtro para 'especie' - busca exata
    if (query.status) {
        filtros.status = query.status;
    }

    return filtros;
};

const filtrarAnimais = async (query) => {
    const filtros = aplicarFiltros(query);

    const animais = await Animal.findAll({
        where: filtros,
    });

    return animais;
};

module.exports = {
    filtrarAnimais,
};