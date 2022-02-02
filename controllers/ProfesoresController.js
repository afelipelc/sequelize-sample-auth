const Profesor = require('../models/Profesor');

/*
crear funciones ASYNC que van a procesar las peticiones recibidas
en el recurso profesor

/profesores  (post, get)
/profesores/1/editar  / (put)
/profesores/1  (get -->> show)

*/

// función para agregar profesor
exports.agregar = async (request, response, next) => {
  // request: petición (solicitud del cliente hacia el servidor)
  // response: respuesta (a la petición)
  // next: siguiente (continuar con la petición / request)

  try {
    // crear el profesor con los datos recibidos en el request.body
    await Profesor.create(request.body);

    response.json({ mensaje: 'Se ha registrado el profesor' });
  } catch (error) {
    console.log(error);
  
    let errores = [];
    if (error.errors) {
      errores = error.errors.map( errorItem => ({ 
        campo: errorItem.path,
        error: errorItem.message,
      }));
    }

    response.json({ error: true, mensaje: 'Error al registrar el profesor', errores });
  }
};

// lista de profesores
exports.listar = async (req, res, next) => {
  try {
    // extraer la lista de profesores
    const profesores = await Profesor.findAll({});
    res.json(profesores);
  } catch (error) {
    console.log(error);
    response.json({ mensaje: 'Error al leer profesores' });
  }
};

// mostrar profesor / leer un profesor
exports.mostrar = async (req, res, next) => {
  try {
    const profesor = await Profesor.findByPk( req.params.id );
    if (!profesor) { // si no hay profesor / si profesor no tiene valor
      res.status(404).json({ mensaje: 'No se encontró el profesor.' });
    } else {
      res.json(profesor);
    }
  } catch (error) {
    console.log(error);
    response.status(503).json({ mensaje: 'Error al leer profesores' });
  }
};

exports.actualizar = async (req, res, next) => {
  try {

    const profesor = await Profesor.findByPk( req.params.id );
    if (!profesor) { // si no hay profesor / si profesor no tiene valor
      res.status(404).json({ mensaje: 'No se encontró el profesor.' });
    } else {
      
      // actualizar el objeto profesor
      Object.keys(req.body).forEach((propiedad) => {
        profesor[propiedad] = req.body[propiedad];
      });

      await profesor.save();
      res.json({ mensaje: 'El profesor fue actualizado.' });

    }
  } catch (error) {
    console.log(error);
    let errores = [];
    if (error.errors) {
      errores = error.errors.map( errorItem => ({ 
        campo: errorItem.path,
        error: errorItem.message,
      }));
    }

    res.status(503).json({ error: true, mensaje: 'Error al registrar el profesor', errores });
  }
};

// eliminar profesor
exports.eliminar = async (req, res, next) => {
  try {
    // encontrar el profesor a eliminar
    const profesor = await Profesor.findByPk( req.params.id );

    if (!profesor) { // si no hay profesor / si profesor no tiene valor
      res.status(404).json({ mensaje: 'No se encontró el profesor.' });
    } else {
      // eliminarlo
      await profesor.destroy();
      res.json({ mensaje: 'El profesor fue eliminado.' });
    }
  } catch (error) {
    res.status(503).json({ mensaje: 'Error al eliminar profesor.' });
  }
};


