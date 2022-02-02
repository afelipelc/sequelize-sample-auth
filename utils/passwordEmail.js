const nodemailer = require('nodemailer');

const SERVIDOR_SMTP = 'smtp.office365.com';
const USUARIO_SMTP = 'felipe.lima@utim.edu.mx';
const PASSWORD_SMTP = 'aaabbbccc';

exports.passwordEmail = async (nombre, email, token) => {
  try {
    let transporter = nodemailer.createTransport({
      host: SERVIDOR_SMTP,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: USUARIO_SMTP, // generated ethereal user
        pass: PASSWORD_SMTP, // generated ethereal password
      },
    });

    let mensaje = `Hola, ${nombre}<br>`;
    mensaje += 'Has solicitado restaurar tu contraseña, ';
    mensaje += `<a href="http://localhost:3000/restablecer-contrasena/${token}">Haz clic aquí</a><br>`;
    mensaje += 'El enlace es válido sólo por una hora desde su envío.';

    let info = await transporter.sendMail({
      from: 'Felipe Lima <felipe.lima@utim.edu.mx>', // sender address
      to: `${nombre}<${email}>`, // list of receivers: Juan Pérez<juan@algo.com>
      subject: "Recuperación de contraseña", // Subject line
      html: mensaje, // html body
    });

    console.log("Message sent: %s", info.messageId);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

