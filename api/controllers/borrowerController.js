import {db} from "../connect.js"

//CREAR SOLICITANTE
export const createBorrower = async (req, res) => {
    try {
      const { nombre, apellido, cedula, sexo, pnf, trayecto, ocupacion } = req.body;
  
      // Validar campos
      if (!nombre) {
        return res.status(400).json({ error: "El nombre es requerido" });
      }
      if (!apellido) {
        return res.status(400).json({ error: "El apellido es requerido" });
      }
      if (!cedula) {
        return res.status(400).json({ error: "La cédula es requerida" });
      }
      if (!sexo) {
        return res.status(400).json({ error: "El sexo es requerido" });
      }
      if (!pnf) {
        return res.status(400).json({ error: "El PNF es requerido" });
      }
      if (!trayecto) {
        return res.status(400).json({ error: "El trayecto es requerido" });
      }
      if (!ocupacion) {
        return res.status(400).json({ error: "La ocupación es requerida" });
      }
  
      // Consultar si el solicitante ya existe
      const q = "SELECT * FROM solicitante WHERE cedula = ?";
      db.query(q, [cedula], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("Este solicitante ya está registrado");
  
        // Crear solicitante
        const insertSolicitanteQuery =
          "INSERT INTO solicitante (`nombre`, `apellido`, `cedula`, `sexo`, `pnf`, `trayecto`, `ocupacion`) VALUES (?)";
  
        const values = [nombre, apellido, cedula, sexo, pnf, trayecto, ocupacion];
  
        db.query(insertSolicitanteQuery, [values], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json("Solicitante creado correctamente");
        });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json("Error inesperado");
    }
  };

//ACTUALIZAR SOLICITANTE
export const updateBorrower = async (req, res) => {
    try {
       
      const {id_solicitante, nombre, apellido, cedula, sexo, pnf, trayecto, ocupacion } = req.body;
  
      // Validar campos
      if (!nombre || !apellido || !cedula || !sexo || !pnf || !trayecto || !ocupacion) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
      }
  
      // Verificar si el solicitante existe
      const checkSolicitanteQuery = "SELECT * FROM solicitante WHERE id_solicitante = ?";
      db.query(checkSolicitanteQuery, [id_solicitante], (err, solicitanteData) => {
        if (err) return res.status(500).json(err);
        if (!solicitanteData.length) return res.status(404).json("Solicitante no encontrado");
  
        // Actualizar el solicitante
        const updateSolicitanteQuery =
          "UPDATE solicitante SET nombre = ?, apellido = ?, cedula = ?, sexo = ?, pnf = ?, trayecto = ?, ocupacion = ? WHERE id_solicitante = ?";
  
        const values = [
          nombre,
          apellido,
          cedula,
          sexo,
          pnf,
          trayecto,
          ocupacion,
          id_solicitante,
        ];
  
        db.query(updateSolicitanteQuery, values, (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json("Solicitante actualizado correctamente");
        });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json("Error inesperado");
    }
  };

//OBTENER TODOS LOS SOLICITANTES
export const getAllBorrowers = async (req, res) => {
    try {
      // Consulta para obtener todos los libros ordenados por título
      const query = "SELECT * FROM solicitante ORDER BY cedula";
      
      db.query(query, (err, data) => {
        if (err) return res.status(500).json(err);
  
        // Devolver la lista de libros ordenados por título
        return res.status(200).json(data);
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener la lista de solicitantes" });
    }
  };
 
// OBTENER UN LIBRO POR SU CÓDIGO
export const getBorrowerByCode = async (req, res) => {
    try {
      const { codigo } = req.params;
  
      // Consulta para obtener un libro por su código
      const query = "SELECT * FROM solicitante WHERE id_solicitante = ?";
      
      db.query(query, [codigo], (err, data) => {
        if (err) return res.status(500).json(err);
  
        if (data.length === 0) {
          return res.status(404).json("Solicitante no encontrado");
        }
  
        // Devolver el libro encontrado en la respuesta JSON
        return res.status(200).json(data[0]);
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener el solicitante" });
    }
  };
  
//OBTENER SOLICITANTES POR PNF 
export const getBorrowerByPnf = async (req, res) => {
    try {
      const { pnf } = req.params;
  
      // Consulta para obtener un solicitante por su pnf
      const query = "SELECT * FROM solicitante WHERE pnf = ?";
      
      db.query(query, [pnf], (err, data) => {
        if (err) return res.status(500).json(err);
  
        if (data.length === 0) {
          return res.status(404).json("Solicitante no encontrado");
        }
  
        // Devolver el solicitante encontrado en la respuesta JSON
        return res.status(200).json(data);
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener el solicitante" });
    }
  };

//OBTENER SOLICITANTES POR MAYOR NUMERO DE CONSULTAS
export const getBorrowerByRes = async (req, res) => {
    try {
        // Consulta para obtener todos los solicitantes ordenados por título
        const query = "SELECT * FROM solicitante ORDER BY prestamos DESC";
        
        db.query(query, (err, data) => {
          if (err) return res.status(500).json(err);
    
          // Devolver la lista de solicitantes ordenados por título
          return res.status(200).json(data);
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener la lista de solicitantes" });
      }
  };

// ELIMINAR UN SOLICITANTE POR SU CÓDIGO
export const deleteBorrowerByCode = async (req, res) => {
    try {
      const { codigo } = req.params;
  
      // Consulta para eliminar un libro por su código
      const deleteQuery = "DELETE FROM solicitante WHERE id_solicitante = ?";
  
      db.query(deleteQuery, [codigo], (err, result) => {
        if (err) return res.status(500).json(err);
  
        if (result.affectedRows === 0) {
          return res.status(404).json("Solicitante no encontrado, no se pudo eliminar");
        }
  
        // Libro eliminado exitosamente
        return res.status(200).json("Solicitante eliminado correctamente");
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar el solicitante" });
    }
  };
    