const passport = require('passport');

const { jwtGenetator } = require('../utils/jwtGenerator');

const renderToken = (usuario) => {
  // extraer los datos del usuario
  const {
    id, nombre, apellidos, email, rol,
  } = usuario;

  // generar el token que incluya datos del usuario: id, email, role,
  // pueden agregar más datos si los necesitan validar en la sesión
  const token = jwtGenetator({
    id, email, rol,
  });

  // enviar el token al cliente, junto con los datos del usuario
  return {
    usuario: {
      id, nombre, apellidos, email,
    },
    token,
  };
};

exports.login = async (req, res, next) => {
  // invocar a la verificación del usuario con passport
  passport.authenticate('login', async (err, usuario, info) => {
    try {
      // si el usuario no existe, u ocurrió un error
      if (!usuario) {
        return res.status(400).json({
          error: true,
          message: !!info ? info.message : 'Solicite al administrador revisar su cuenta de usuario',
        });
      }

      // procesar el login, y retornar error si lo hay, sino, retornar los datos del usuario autenticado junto con el jwt
      // es lo que se obtendrá al hacer login desde el frontend o postman
      req.login(usuario, { session: false }, async (error) => {
        if (error) return next(error);
        return res.json(renderToken(usuario));
      });

    } catch (error) {
      return res.status(500).json({
        message: 'Error al iniciar sesión',
      });
    }
  })(req, res, next);
};