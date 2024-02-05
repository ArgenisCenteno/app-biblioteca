import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs"
import {db} from "../connect.js"
import  nodemailer from "nodemailer"

//CREAR USUARIO
export const createUser = async (req, res)  => { 
    try {
        const {nombre, apellido, email, clave, cedula } = req.body;

        //VALIDAR CAMPOS DEL FORMULARIO
        if (!nombre) {
            return res.send({ error: "Nombre es requerido" });
          }
          if (!apellido) {
            return res.send({ message: "Apellido es requerido" });
          }
          if (!email) {
            return res.send({ message: "Email es requerida" });
          }
          if (!clave) {
            return res.send({ message: "Clave es requerido" });
          }
          if (!cedula) {
            return res.send({ message: "Cédula es requerida" });
          }

          //CONSULTAR SI EL USUARIO EXISTE
          const q = "SELECT * FROM usuario WHERE email = ?";
          db.query(q, [email],  (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.length) return res.status(409).json("Este usuario se encuentra registrado");
        //CREAR USUARIO
            //ENCRIPTAR CLAVE
            const salt =   bcrypt.genSaltSync(10);
            const hashedPassword =  bcrypt.hashSync(clave, salt);
        
            const q =
              "INSERT INTO usuario (`nombre`,`apellido`,`email`,`clave`,`cedula`) VALUE (?)";
        
            const values = [
              nombre, apellido, email, hashedPassword, cedula
            ];
        
            db.query(q, [values], (err, data) => {
              if (err) return res.status(500).json(err);
              return res.status(200).json("Usuario creado correctamente");
            });
          })

    } catch (error) {
        console.log(error)
        return res.status(500).json("Error inesperado")
    }


}


//INICIAR SESIÓN
export const login = async( req, res) => {
    try {
      
         //CONSULTAR SI EL USUARIO YA EXISTE
        const user =  "SELECT * FROM usuario WHERE email = ?";
         

        db.query(user, [req.body.email], (err, data) =>{
            if(err) return res.status(500).json(err);
            if(data.length === 0) return res.status(404).json("Usuario o contraseña incorrecta");
            
        //COMPARAR CONTRASEÑAS
        const checkPassword = bcrypt.compareSync(req.body.password, data[0].clave);
        if(!checkPassword) return res.status(400).json("Usuario o contraseña incorrecta ")
       // Enviar la información del usuario en la respuesta
      const usuarioInfo = {
        id_usuario: data[0].id_usuario,
        nombre: data[0].nombre,
        apellido: data[0].apellido,
        email: data[0].email,
        cedula: data[0].cedula,
      };     
        //GENERAR TOKEN
        const token =  JWT.sign({id_usuario: data.id_usuario }, process.env.JWT_SECRET, {
        expiresIn: "30d",
        });
        console.log(data.id_usuario)
        res.status(200).send({
        success: true,
        message: "Inicio de sesión",
        user: usuarioInfo,
        token,
      });
        })

    } catch (error) {
        console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
    }
}

export const getAllUsers = async (req, res) => {
  try {
    const query = "SELECT id_usuario, nombre, apellido, email, cedula FROM usuario";
    
    db.query(query, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error inesperado");
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const query = "SELECT id_usuario, nombre, apellido, email, cedula FROM usuario WHERE id_usuario = ?";

    db.query(query, [id_usuario], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("Usuario no encontrado");
      return res.status(200).json(data[0]);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error inesperado");
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const query = "DELETE FROM usuario WHERE id_usuario = ?";
    
    db.query(query, [id_usuario], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows === 0) return res.status(404).json("Usuario no encontrado");
      return res.status(200).json("Usuario eliminado correctamente");
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error inesperado");
  }
};

export const updateUserById = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const {nombre, apellido, email, clave, cedula } = req.body;

    // Validar que al menos uno de los campos a actualizar esté presente
    if (!nombre && !apellido && !email && !cedula) {
      return res.status(400).json("Se requiere al menos un campo para actualizar.");
    }

    const query = "UPDATE usuario SET ? WHERE id_usuario = ?";

    const updatedUser = {};

    if (nombre) updatedUser.nombre = nombre;
    if (apellido) updatedUser.apellido = apellido;
    if (email) updatedUser.email = email;
    if (cedula) updatedUser.cedula = cedula;

    db.query(query, [updatedUser, id_usuario], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows === 0) return res.status(404).json("Usuario no encontrado");
      return res.status(200).json("Usuario actualizado correctamente");
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error inesperado");
  }
};


export const enviarEmail = async (req, res) => {
  const { email } = req.body;
  // Configuración de nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'goitiadorina@gmail.com',
      pass: 'hkzimnmwuokrajgm',
    },
  });

  // Enlace para cambiar la clave
  const enlaceCambiarClave =  `http://localhost:5173/cambiar-clave `;

  // Detalles del correo
  const mailOptions = {
    from: 'goitiadorina@gmail.com',
    to: email,
    subject: 'Recuperación de clave',
    text: `Haz clic en el siguiente enlace para cambiar tu clave: ${enlaceCambiarClave}`,
  };

  // Intentar enviar el correo
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado:', info.response);
    res.status(200).json({ success: true, message: 'Correo enviado exitosamente' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ success: false, message: 'Error al enviar el correo' });
  }
};

export const cambiarClavePorCedula = async (req, res) => {
  try {
    const { cedula, nuevaClave } = req.body;
console.log( cedula, nuevaClave)
    // Encripta la nueva clave
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(nuevaClave, salt);

    // Actualiza la contraseña en la base de datos
    const actualizarClaveQuery = `UPDATE usuario SET clave = ? WHERE cedula = ?`;
    db.query(actualizarClaveQuery, [hashedPassword, cedula], (updateError, updateResults) => {
      if (updateError) {
        console.log('Error al actualizar la contraseña:', updateError);
        return res.status(500).json({ success: false, message: 'Error interno del servidor' });
      }

      if (updateResults.affectedRows === 1) {
        res.status(200).json({ success: true, message: 'Contraseña actualizada exitosamente' });
      } else {
        res.status(500).json({ success: false, message: 'Error al actualizar la contraseña' });
      }
    });
  } catch (error) {
    console.error('Error al actualizar la contraseña:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};
export const contarRegistros = async (req, res) => {
  try {
    const queryEjemplar = `SELECT COUNT(*) AS total_ejemplares FROM ejemplar`;
    const queryProyectoEjemplar = `SELECT COUNT(*) AS total_proyecto_ejemplares FROM proyecto_ejemplar`;
    const queryReservacion = `SELECT COUNT(*) AS total_reservaciones FROM reservacion`;
    const querySolicitante = `SELECT COUNT(*) AS total_solicitantes FROM solicitante`;
    const queryUsuario = `SELECT COUNT(*) AS total_usuarios FROM usuario`;
    const queryPrestamo = `SELECT COUNT(*) AS total_prestamos FROM prestamo`;
    const queryPrestamoProyecto = `SELECT COUNT(*) AS total_prestamos_proyecto FROM prestamo_proyecto`;

    // Ejecutar las consultas
    const [
      resultEjemplar,
      resultProyectoEjemplar,
      resultReservacion,
      resultSolicitante,
      resultUsuario,
      resultPrestamo,
      resultPrestamoProyecto
    ] = await Promise.all([
      db.query(queryEjemplar),
      db.query(queryProyectoEjemplar),
      db.query(queryReservacion),
      db.query(querySolicitante),
      db.query(queryUsuario),
      db.query(queryPrestamo),
      db.query(queryPrestamoProyecto)
    ]);
 

    // Construir objeto de respuesta
    const respuesta = {
      total_ejemplares: resultEjemplar[0].total_ejemplares,
      total_proyecto_ejemplares: resultProyectoEjemplar[0].total_proyecto_ejemplares,
      total_reservaciones: resultReservacion[0].total_reservaciones,
      total_solicitantes: resultSolicitante[0].total_solicitantes,
      total_usuarios: resultUsuario[0].total_usuarios,
      total_prestamos: resultPrestamo[0].total_prestamos,
      total_prestamos_proyecto: resultPrestamoProyecto[0].total_prestamos_proyecto
    };

    // Devolver la respuesta
    return res.status(200).json(respuesta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
