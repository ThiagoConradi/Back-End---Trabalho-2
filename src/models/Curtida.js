// Importando as dependências necessárias
const { Model, DataTypes } = require('sequelize');
const db = require('../config/database');

class Curtida extends Model {
    // Associação com as outras classes
    static associate(models) {

    }
}

// Inicializando a classe User com o esquema do banco de dados
Curtida.init({
    // idUsuario não pode ser null
    idUsuario: { type: DataTypes.INTEGER, allowNull: false },
    // idPostagem não pode ser null
    idPostagem: { type: DataTypes.INTEGER, allowNull: false },
}, {
    sequelize: db.sequelize, // Conexão com o banco de dados
    modelName: 'Curtida', // Nome do modelo
    tableName: 'curtidas', // Nome da tabela no banco de dados
    timestamps: false,
});

// Exportando a classe Curtida
module.exports = Curtida;