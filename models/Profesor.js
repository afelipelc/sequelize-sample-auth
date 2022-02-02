const Sequelize = require('sequelize');
const db = require('../config/db');

// modelo Profesor
const Profesor = db.define('Profesor', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: Sequelize.STRING(32),
    allowNull: false,
    validate: {
      notEmpty: {
        args: true, // notEmpty: true
        msg: 'El nombre no puede quedar vacío',
      },
      /*isAlpha: {
        args: true, // isAlpha: true
        msg: 'Solo puede contener letras',
      },*/
    },
  },
  apellidos: {
    type: Sequelize.STRING(32),
    allowNull: false,
    validate: {
      notEmpty: {
        args: true, // notEmpty: true
        msg: 'Apellidos no puede quedar vacío',
      },
      /*isAlpha: {
        args: true, // isAlpha: true
        msg: 'Solo puede contener letras',
      },*/
    },
  },
  email: {
    type: Sequelize.STRING(32),
    allowNull: false,
    validate: {
      notNull: {
        args: true, // notEmpty: true
        msg: 'El email no puede quedar vacío',
      },
      notEmpty: {
        args: true, // notEmpty: true
        msg: 'El email no puede quedar vacío',
      },
      isEmail: {
        args: true, // isEmail: true
        msg: 'No es un email válido',
      },
    },
  },
  telefono: {
    type: Sequelize.STRING(16),
    validate: {
      isMobilePhone: {
        args: ['es-MX'],
        msg: 'No es un teléfono válido',
      },
    },
  },
  activo: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Profesor;
