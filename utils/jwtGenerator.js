const jwt = require('jsonwebtoken');

// se recomienda  la clave secreta se almacene en una variable de entorno 
// para ejemplo, la dejaremos aquí
const TOKEN_SECRET='phDqedd5a4sd5f4sadf$&$%&/R24dewr563';

/**
 * generador de jwt
 * 
 * recibe los datos a tokenizar
 */
exports.jwtGenetator = (datos) => jwt.sign(
  {
    usuario: datos,
  },
  TOKEN_SECRET, //  process.env.TOKEN_SECRET,
  { expiresIn: process.env.EXPIRE_TOKEN || '24h' },
);

/**
 * jwt decode token
 */
 exports.jwtDecode = (token) => jwt.verify(
  token,
  TOKEN_SECRET, // process.env.TOKEN_SECRET,
  (err, decoded) => {
    if (decoded) {
      return decoded;
    }
    if (err) {
      return null;
    }
    return null;
  },
);