const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');

exports.agregar = async (request, response, next) => {
  try {
    // validar que venga la contraseña
    if (!request.body.password) {
      response.status(400).json({ message: 'La contraseña es obligatoria.'});
      next();
    }

    const datosUsuario = {...request.body};

    // asegurar la contraseña
    // usar bcrypt
    // salt: generacion de una cadena aleatoria de N longitud
    const salt = await bcrypt.genSalt(10);

    // cifrar la contraseña y meterla en los datos del usuario
    datosUsuario.password = await bcrypt.hash(datosUsuario.password, salt);

    // registrar el usuario
    const usuario = await Usuario.create(datosUsuario);

    usuario.password = null; // evitar enviarlo en la respuesta

    response.json({ message: 'El usuario ha sido registrado.', usuario});
  } catch (error) {
    console.log(error);
  
    let errores = [];
    if (error.errors) {
      errores = error.errors.map( errorItem => ({ 
        campo: errorItem.path,
        error: errorItem.message,
      }));
    }

    response.json({ error: true, mensaje: 'Error al registrar el usuario', errores });
  }
};

// lista de usuarios
exports.listar = async (req, res, next) => {
  try {
    // extraer la lista de usuarios
    const usuarios = await Usuario.findAll({});
    res.json(usuarios);
  } catch (error) {
    console.log(error);
    response.json({ mensaje: 'Error al leer usuarios' });
  }
};

// leer usuario por id
exports.mostrar = async (req, res, next) => {
  try {
    const usuario = await Usuario.findByPk( req.params.id );
    usuario.password = null;
    if (!usuario) {
      res.status(404).json({ mensaje: 'No se encontró el usuario.' });
    } else {
      res.json(usuario);
    }
  } catch (error) {
    console.log(error);
    response.status(503).json({ mensaje: 'Error al leer el usuario' });
  }
};

// mostrar mi perfil
exports.perfil = async (req, res, next) => {
  try {
    const usuario = await Usuario.findByPk( req.user.id );
    usuario.password = null;
    if (!usuario) {
      res.status(404).json({ mensaje: 'No se encontró el usuario.' });
    } else {
      res.json(usuario);
    }
  } catch (error) {
    console.log(error);
    response.status(503).json({ mensaje: 'Error al leer el perfil de usuario' });
  }
};
