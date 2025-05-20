const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

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
        type: DataTypes.ENUM('cachorro', 'gato', 'outro'),
        allowNull: false,
    },
    porte: {
        type: DataTypes.ENUM('pequeno', 'medio', 'grande'),
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
        type:  DataTypes.BLOB('long'),
    },
    status: {
        type: DataTypes.ENUM('disponivel', 'adotado'),
        defaultValue: 'disponivel',
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

// Exporta com associação separada
Animal.associate = (models) => {
    Animal.belongsTo(models.Usuario, {
        foreignKey: 'usuario_id',
        as: 'usuario',
    });
};

module.exports = Animal;
