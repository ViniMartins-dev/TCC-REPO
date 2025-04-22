const Adocao = require('../models/Adocao');
const Animal = require('../models/Animal');

const aprovarAdocao = async (idAdocao, aval) => {
  const adocao = await Adocao.findByPk(idAdocao);
  if (!adocao) {
    throw new Error('Adoção não encontrada.');
  }

  const statusValido = ['Pendente', 'Aprovada', 'Rejeitada'];
  if (!statusValido.includes(aval)) {
    throw new Error('Status de adoção inválido. Use: Pendente, Aprovada ou Rejeitada.');
  }

  if (adocao.status !== 'Pendente') {
    throw new Error(`Adoção já foi ${adocao.status.toLowerCase()}.`);
  }

  adocao.status = aval;
  await adocao.save();

  // Se a adoção for aprovada, atualiza o status do animal
  if (aval === 'Aprovada') {
    const animal = await Animal.findByPk(adocao.animal_id);
    if (animal) {
      animal.status = 'Adotado';
      await animal.save();
    }
  }

  return adocao;
};

module.exports = {
  aprovarAdocao,
};
