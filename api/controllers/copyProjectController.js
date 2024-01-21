import {db} from "../connect.js"

//CREAR EJEMPLAR DE UN LIBRO

export const createCopyOfProject = async(req, res) =>{
    try {
        const { codigo_ejemplar, id_proyecto, estado } = req.body;
        //VALIDAR CAMPOS
        if (!codigo_ejemplar) {
          return res.send({ error: "El codigo es requerido" });
        }
        if (! id_proyecto) {
          return res.send({ message: "Es necesario el id del pryecto es requerido" });
        }
        if (!estado) {
          return res.send({ message: "El estado  es requerido" });
        }
         //CONSULTAR SI EL PROYECTO EXISTE
         const q = "SELECT * FROM proyecto WHERE id_proyecto = ?";
         db.query(q, [id_proyecto],  (err, data) => {
           if (err) return res.status(500).json(err); 
        
           const q =
           "INSERT INTO proyecto_ejemplar (`codigo_ejemplar`,`id_proyecto`,`estado`) VALUE (?)";
     
         const values = [
            codigo_ejemplar, id_proyecto, estado 
         ];
     
         db.query(q, [values], (err, data) => {
           if (err) return res.status(500).json(err);
           return res.status(200).json("Ejemplar creado correctamente");
           console.log(data)
         });

        })
      
    } catch (error) {
        console.log(error)
    }
}

//OBTENER TODOS LOS EJEMPLAR DE UN PROYECTO
export const getCopyOfProjectById = async (req, res) => {
    try {
      const { codigo } = req.params;
  
      // Consulta para obtener un libro por su código
      const query = "SELECT * FROM proyecto_ejemplar WHERE id_proyecto = ?";
      
      db.query(query, [codigo], (err, data) => {
        if (err) return res.status(500).json(err);
  
        if (data.length === 0) {
          return res.status(404).json("Ejemplar no encontrado");
        }
  
        // Devolver el libro encontrado en la respuesta JSON
        return res.status(200).json(data);
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener el ejemplar" });
    }
  };

// ELIMINAR UN LIBRO POR SU CÓDIGO
export const deleteCopyOfProject = async (req, res) => {
    try {
      const { codigo } = req.params;
  
      // Consulta para eliminar un libro por su código
      const deleteQuery = "DELETE FROM proyecto_ejemplar WHERE id_ejemplar_proyecto = ?";
  
      db.query(deleteQuery, [codigo], (err, result) => {
        if (err) return res.status(500).json(err);
  
        if (result.affectedRows === 0) {
          return res.status(404).json("Ejemplar no encontrado, no se pudo eliminar");
        }
  
        // Libro eliminado exitosamente
        return res.status(200).json("Ejemplar eliminado correctamente");
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar el ejemplar" });
    }
  };
  