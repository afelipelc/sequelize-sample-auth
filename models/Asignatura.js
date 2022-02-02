const Sequelize = require('sequelize');

const db = require('../config/db');

const Profesor = require('./Profesor');

const Asignatura = db.define('Asignatura', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: Sequelize.STRING(48),
    allowNull: false,
  },
  anio: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  horasSemana: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  horasTotales: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});

Asignatura.belongsTo(Profesor, { onDelete: 'CASCADE' });


module.exports = Asignatura;
