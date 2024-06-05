// Importando as dependências necessárias
const db = require('../config/database');
const { Model, DataTypes } = require('sequelize');
const UsuarioDAO = require('./dao/UsuarioDAO');

// Definindo a classe Postagem que estende Model do Sequelize
class Resposta extends Model {
    // Aqui devem vir os métodos que essa classe pode executar
    getAutor() {
        let autor = UsuarioDAO.getById(this.idUsuario)
        return autor;
    }
    // Associação com a classe Usuario
    static associate(models) {
        this.belongsTo(models.Usuario, { foreignKey: 'idUsuario', as: 'autor' });
    }
}

// Inicializando a classe Postagem com o esquema do banco de dados
Resposta.init({
    // idUsuario é a chave estrangeira do usuário que fez o post
    idUsuario: { type: DataTypes.INTEGER, allowNull: false },
    idPostagem: { type: DataTypes.INTEGER, allowNull: false },
    conteudo: { type: DataTypes.STRING, allowNull: false },
    dataHora: { type: DataTypes.DATE, allowNull: false },
}, {
    sequelize: db.sequelize, // Conexão com o banco de dados
    modelName: 'Resposta', // Nome do modelo
    tableName: 'respostas', // Nome da tabela no banco de dados
});

// Exportando a classe Postagem
module.exports = Resposta;