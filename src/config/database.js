// config/database.js
const Sequelize = require('sequelize');

const sequelize = new Sequelize('forum', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3333,
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize,
};