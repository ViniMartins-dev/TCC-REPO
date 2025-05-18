const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    tipo: {
        type: DataTypes.ENUM('tutor', 'protetor'),
        allowNull: false,
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    sobrenome: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    telefone: {
        type: DataTypes.STRING(20),
    },
    senha: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    cpf: {
        type: DataTypes.STRING(14),
    },
    cnpj: {
        type: DataTypes.STRING(18),
    },
    nome_fantasia: {
        type: DataTypes.STRING(255),
    },
    data_nascimento: {
        type: DataTypes.DATEONLY,
    },
    latitude: {
        type: DataTypes.DECIMAL(10, 8),
    },
    longitude: {
        type: DataTypes.DECIMAL(11, 8),
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
    tableName: 'usuarios',
    timestamps: false,
    hooks: {
        beforeUpdate: (usuario, options) => {
            usuario.atualizado_em = new Date();
        }
    }
});

module.exports = Usuario;
