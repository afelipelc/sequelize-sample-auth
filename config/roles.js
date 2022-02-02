const AccessControl = require('accesscontrol');

const ac = new AccessControl();

/**
 * definir roles del más inferior al superior
 *  ninguno
 *    usuario
 *      admin
 *        super
 */
exports.roles = () => {
  ac.grant('ninguno');
  // aqui los permisos de rol: ninguno

  ac.grant('usuario')
    .readOwn('perfil')
    .readAny(['asignatura', 'profesor']);

  ac.grant('admin')
    .extend('usuario') // heredar rol
    .readAny('usuario') // poder leer usuarios
    .createAny(['asignatura', 'profesor', 'usuario'])
    .updateAny(['asignatura', 'profesor', 'usuario']);
  
  ac.grant('super')
    .extend('admin')
    .deleteAny(['asignatura', 'profesor', 'usuario']);
  
    return ac;
};
