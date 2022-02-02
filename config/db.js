const { Sequelize } = require('sequelize');

// exportar instancia de sequelize
module.exports = new Sequelize('apisequelizedb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
}); 
