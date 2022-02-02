// implementar funciones que nos ayuden a validar datos

exports.campoRequerido = (value) => {
  if (!value.toString().trim().length) { // si no tiene longitud
    throw new Error("El campo es obligatorio");
  }
};

exports.esEmail = (value) => {
  if (!value.match(/(.+)@(.+){2,}\.(.+){2,}/)) {
    throw new Error("No es un email válido");
  }
};

exports.letrasNumeros = (value) => {
  if (!value.match(/^[0-9a-zA-Z\s]+$/)) {
    throw new Error("Solo debe contener letras y números");
  }
};

exports.esTelefono = (value) => {
  if (!value.match(/^[0-9]{2}[0-9]{8}$/)) {
    throw new Error("No es número telefónico válido");
  }
};