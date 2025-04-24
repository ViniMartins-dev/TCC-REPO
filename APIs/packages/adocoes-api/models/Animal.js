const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');

const Animal = sequelize.define('Animal', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    especie: {
        type: DataTypes.ENUM('Cachorro', 'Gato', 'Outro'),
        allowNull: false,
    },
    porte: {
        type: DataTypes.ENUM('Pequeno', 'Médio', 'Grande'),
    },
    raca: {
        type: DataTypes.STRING(50),
    },
    idade: {
        type: DataTypes.INTEGER,
    },
    sexo: {
        type: DataTypes.ENUM('M', 'F'),
        allowNull: false,
    },
    descricao: {
        type: DataTypes.TEXT,
    },
    personalidade: {
        type: DataTypes.STRING(255),
    },
    foto_url: {
        type: DataTypes.STRING(255),
    },
    status: {
        type: DataTypes.ENUM('Disponível', 'Adotado'),
        defaultValue: 'Disponível',
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id',
        },
        onDelete: 'CASCADE',
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
    tableName: 'animais',
    timestamps: false,
    hooks: {
        beforeUpdate: (animal) => {
            animal.atualizado_em = new Date();
        },
    },
});

Animal.belongsTo(Usuario, {
    foreignKey: 'usuario_id',  // Chave estrangeira para o protetor
    as: 'protetor',  // Alias para o protetor
});

module.exports = Animal;
