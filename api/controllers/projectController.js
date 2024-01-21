import {db} from "../connect.js"
import { v4 as uuidv4 } from 'uuid';

//CREAR PROYECTO
export const createProject = async (req, res) => {
    try {
      const { titulo, autor, pnf, trayecto, fecha_presentacion, cantidad } = req.body;
     
      // Validar campos del formulario
      if (!titulo || !autor  || !pnf || !trayecto || !fecha_presentacion) {
        return res.status(400).json({ message: "Todos los campos son requeridos" });
      }
  
      // Consultar si el proyecto ya existe
      const q = "SELECT * FROM proyecto WHERE titulo = ?";
      db.query(q, [titulo], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("Este proyecto ya está registrado");
  
        // Crear proyecto
        const q =
          "INSERT INTO proyecto (`titulo`, `autor`, `pnf`, `trayecto`, `fecha_presentacion`) VALUES (?)";
  
        const values = [
          titulo,
          autor, 
          pnf,
          trayecto,
          fecha_presentacion,
        ];
  
        db.query(q, [values], (err, data) => {
          if (err) return res.status(500).json(err);

          // REGISTRAR LOS EJEMPLARES
          const ejemplarValues = [];
          if(cantidad > 0) {
          for (let i = 0; i < cantidad; i++) {
            const codigo_ejemplar = uuidv4(); // Genera un código único para el ejemplar
            ejemplarValues.push(["disponible", codigo_ejemplar, data.insertId]);
          }
  
          const ejemplarQuery =
            "INSERT INTO proyecto_ejemplar (estado, codigo_ejemplar, id_proyecto) VALUES ?";
          
          db.query(ejemplarQuery, [ejemplarValues], (err, ejemplarData) => {
            if (err) return res.status(500).json(err);
            console.log(err)
  
           
          });
        }
          return res.status(200).json("Proyecto registrado correctamente");
        });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json("Error inesperado");
    }
  };

//ACTUALIZAR PROYECTO  
export const updateProject = async (req, res) => {
  try {
    const { titulo, autor, pnf, trayecto, fecha_presentacion, id_proyecto, cantidad } = req.body;

    // Validar campos del formulario
    if (!titulo || !autor || !pnf || !trayecto || !fecha_presentacion) {
      return res.status(400).json({ message: "Todos los campos son requeridos" });
    }

    // Verificar si el proyecto existe
    const checkProjectQuery = "SELECT * FROM proyecto WHERE id_proyecto = ?";
    const projectData = await db.query(checkProjectQuery, [id_proyecto]);

    if (!projectData === 0) {
      return res.status(404).json("Proyecto no encontrado");
    }

    // Actualizar el proyecto
    const updateProjectQuery =
      "UPDATE proyecto SET titulo = ?, autor = ?, pnf = ?, trayecto = ?, fecha_presentacion = ? WHERE id_proyecto = ?";

    const updateValues = [
      titulo,
      autor,
      pnf,
      trayecto,
      fecha_presentacion,
      id_proyecto,
    ];

    db.query(updateProjectQuery, updateValues, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }

      // REGISTRAR LOS EJEMPLARES
      const ejemplarValues = [];
      if (cantidad > 0) {
        for (let i = 0; i < cantidad; i++) {
          const codigo_ejemplar = uuidv4(); // Genera un código único para el ejemplar
          ejemplarValues.push(["disponible", codigo_ejemplar, id_proyecto]);
        }

        const ejemplarQuery =
          "INSERT INTO proyecto_ejemplar (estado, codigo_ejemplar, id_proyecto) VALUES ?";

        db.query(ejemplarQuery, [ejemplarValues], (err, ejemplarData) => {
          if (err) {
            console.error(err);
            return res.status(500).json(err);
          }

          return res.status(200).json("Proyecto actualizado correctamente");
        });
      } else {
        // Si no se requiere registrar ejemplares
        return res.status(200).json("Proyecto actualizado correctamente");
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json("Error inesperado");
  }
};



//OBTENER TODOS LOS PROYECTOS
export const getAllProjects = async (req, res) => {
    try {
      // Consulta para obtener todos los libros ordenados por título
      const query = "SELECT * FROM proyecto ORDER BY titulo";
      
      db.query(query, (err, data) => {
        if (err) return res.status(500).json(err);
  
        // Devolver la lista de libros ordenados por título
        return res.status(200).json(data);
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener la lista de proyectos" });
    }
  };  

// OBTENER UN PROYECTO POR SU CÓDIGO
export const getProjectByCode = async (req, res) => {
    try {
      const { codigo } = req.params;
  
      // Consulta para obtener un libro por su código
      const query = "SELECT * FROM proyecto WHERE id_proyecto = ?";
      
      db.query(query, [codigo], (err, data) => {
        if (err) return res.status(500).json(err);
  
        if (data.length === 0) {
          return res.status(404).json("Proyecto no encontrado");
        }
  
        // Devolver el libro encontrado en la respuesta JSON
        return res.status(200).json(data[0]);
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener el proyecto" });
    }
  };  

//OBTENER PROYECTOS POR PNF 
export const getProjectByPnf = async (req, res) => {
    try {
      const { pnf } = req.params;
  
      // Consulta para obtener un libro por su código
      const query = "SELECT * FROM proyecto WHERE pnf = ?";
      
      db.query(query, [pnf], (err, data) => {
        if (err) return res.status(500).json(err);
  
        if (data.length === 0) {
          return res.status(404).json("Proyecto no encontrado");
        }
  
        // Devolver el libro encontrado en la respuesta JSON
        return res.status(200).json(data);
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener el proyecto" });
    }
  };  

//OBTENER PROYECTOS POR MAYOR NUMERO DE CONSULTAS
export const getProyectByRes = async (req, res) => {
    try {
        // Consulta para obtener todos los proyectos ordenados por título
        const query = "SELECT * FROM proyecto ORDER BY consultas DESC";
        
        db.query(query, (err, data) => {
          if (err) return res.status(500).json(err);
    
          // Devolver la lista de proyectos ordenados por título
          return res.status(200).json(data);
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener la lista de proyectos" });
      }
  };

// ELIMINAR UN PROYECTO POR SU CÓDIGO
export const deleteProyectByCode = async (req, res) => {
    try {
      const { codigo } = req.params;
  
      // Consulta para eliminar un proyecto por su código
      const deleteQuery = "DELETE FROM proyecto WHERE id_proyecto = ?";
  
      db.query(deleteQuery, [codigo], (err, result) => {
        if (err) return res.status(500).json(err);
  
        if (result.affectedRows === 0) {
          return res.status(404).json("Proyecto no encontrado, no se pudo eliminar");
        }
  
        // Proyecto eliminado exitosamente
        return res.status(200).json("Proyecto eliminado correctamente");
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar el proyecto" });
    }
  };
    