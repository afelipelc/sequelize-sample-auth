const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const Usuario = require('../models/Usuario');

// se recomienda  la clave secreta se almacene en una variable de entorno 
// para ejemplo, la dejaremos aquí
const TOKEN_SECRET='phDqedd5a4sd5f4sadf$&$%&/R24dewr563';

// Create a passport middleware to handle User login by email and password
passport.use('login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    // Find the user associated with the email provided by the user
    const usuario = await Usuario.findOne({ where: { email, activo: true } }); // buscar el usuario y que sea activo
    if (!usuario) {
      // If the user isn't found in the database, return a message
      return done(null, false, { message: 'Usuario no encontrado' });
    }

    const validado = await usuario.isValidPassword(password); // isValidPassword() debe ser creado en el modelo Usuario

    if (!validado) {
      return done(null, false, { message: 'Datos de acceso incorrectos' });
    }

    // si es valido, continuar con la petición, pasándole los datos del usuario autenticado
    return done(null, usuario);
  } catch (error) {
    return done(error);
  }
}));

// This verifies that the token sent by the user is valid
passport.use(new JWTstrategy({
  // secret we used to sign our JWT
  secretOrKey: TOKEN_SECRET, //process.env.TOKEN_SECRET,
  // we expect the user to send the token as a query paramater with the name 'secret_token'
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
}, async (token, done) => {
  try {
    //  Pass the user details to the next middleware
    return done(null, { ...token.usuario, tokenExp: token.exp });
  } catch (error) {
    return done(error);
  }
}));