const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');
const Usuario = require('./Usuario');
const Animal = require('./Animal');


const Favorito = sequelize.define('favoritos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    animal_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    criado_em: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    atualizado_em: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'favoritos',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['usuario_id', 'animal_id'],
        },
    ],
});

// Associação do favorito com o Tutor
Favorito.belongsTo(Usuario, {
    foreignKey: 'usuario_id',  // Chave estrangeira para o tutor
    as: 'tutor',  // Alias para o tutor
});

// Associação do Adocao com o Animal
Favorito.belongsTo(Animal, {
    foreignKey: 'animal_id',  // Chave estrangeira para o animal
    as: 'animal',  // Alias para o animal
});

module.exports = Favorito;