const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

// Definição do modelo de Adoção
const Adocao = sequelize.define('Adocao', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    status: {
        type: DataTypes.ENUM('Pendente', 'Aprovada', 'Rejeitada'),
        defaultValue: 'Pendente',
    },
    animal_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'animais',  // Referência à tabela de animais
            key: 'id',
        },
        onDelete: 'CASCADE', // Se o animal for deletado, a adoção é deletada
    },
    tutor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',  // Referência à tabela de usuários
            key: 'id',
        },
        onDelete: 'CASCADE', // Se o tutor for deletado, a adoção é deletada
    },
    criado_em: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    atualizado_em: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'adocoes',  // Nome da tabela
    timestamps: false,  // Desabilita timestamps automáticos
    hooks: {
        beforeUpdate: (adocao) => {
            adocao.atualizado_em = new Date();
        },
    },
});

// Associações
const Usuario = require('./Usuario');
const Animal = require('./Animal');

// Associação do Adocao com o Tutor
Adocao.belongsTo(Usuario, {
    foreignKey: 'tutor_id',  // Chave estrangeira para o tutor
    as: 'tutor',  // Alias para o tutor
});

// Associação do Adocao com o Animal
Adocao.belongsTo(Animal, {
    foreignKey: 'animal_id',  // Chave estrangeira para o animal
    as: 'animal',  // Alias para o animal
});

module.exports = Adocao;
