const { roles } = require('../config/roles');

/**
 * función para validar el permiso del usuario actual sobre el recurso indicado
 */

exports.grantAccess = (accion, recurso) => 
  async (request, response, next) => {

    try {
      // permiso
      const permiso = roles().can(request.user.rol)[accion](recurso);

      if (!permiso.granted) {
        return response.status(403).json({
          message: 'No autorizado para realizar esta acción.',
        });
      }

      return next(); // continue con el proceso del request
    } catch (error) {
      return next(error);
    }
};