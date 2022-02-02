const Asignatura = require('../models/Asignatura');
const Profesor = require('../models/Profesor');


exports.agregar = async (request, response, next) => {
  try {
    // crear el Asignatura con los datos recibidos en el request.body
    await Asignatura.create(request.body);

    response.json({ mensaje: 'Se ha registrado la Asignatura' });
  } catch (error) {
    console.log(error);
    response.json({ mensaje: 'Error al registrar la Asignatura' });
  }
};


exports.listar = async (req, res, next) => {
  try {
    // extraer la lista de asignaturas
    const asignaturas = await Asignatura.findAll({
      include: [
        { model: Profesor },
        // { model: Grupo },
      ]
    });
    res.json(asignaturas);
  } catch (error) {
    console.log(error);
    response.json({ mensaje: 'Error al leer asignaturas' });
  }
};