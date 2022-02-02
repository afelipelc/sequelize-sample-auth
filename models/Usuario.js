const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const db = require('../config/db');

// modelo Usuario
const Usuario = db.define('Usuario', {
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
    },
  },
  email: {
    type: Sequelize.STRING(32),
    allowNull: false,
    unique: true,
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
  password: Sequelize.STRING,
  rol: {
    type: Sequelize.STRING(24),
    defaultValue: 'usuario', // habrá: usuario, admin
  },
  activo: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  passwordResetToken: {
    type: Sequelize.STRING,
  },
  passwordResetExpire:  {
    type: Sequelize.DATE,
  },
});

Usuario.prototype.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = Usuario;
