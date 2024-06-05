// Importando as dependências necessárias
const db = require('../config/database');
const { Model, DataTypes } = require('sequelize');

// Definindo a classe Usuario que estende Model do Sequelize
class Curtida extends Model {
  // Aqui deve vir os métodos que essa classe pode executar

  // Associação com a classe Postagem
  static associate(models) {
    this.hasMany(models.Postagem, { foreignKey: 'idCurtida', as: 'curtida' });
  }
}

// Inicializando a classe User com o esquema do banco de dados
Curtida.init({

  idUsuario: { type: DataTypes.INTEGER, allowNull: false },
  idPostagem: { type: DataTypes.INTEGER, allowNull: false },
}, {
  sequelize: db.sequelize, // Conexão com o banco de dados
  modelName: 'Curtida', // Nome do modelo
  tableName: 'curtidas', // Nome da tabela no banco de dados
});

// Exportando a classe Curtida
module.exports = Curtida;
