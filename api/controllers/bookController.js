import {db} from "../connect.js"
import { v4 as uuidv4 } from 'uuid';

//CREAR LIBRO

export const createBook = async (req, res) => {
  try {
    const {
      titulo,
      autor,
      cantidad,
      editorial,
      edicion,
      descripcion,
      pnf,
      fecha_publicacion,
    } = req.body;

    // VALIDAR CAMPOS
    if (!autor) {
      return res.send({ error: "El autor es requerido" });
    }
    if (!titulo) {
      return res.send({ message: "El título es requerido" });
    }

    // CONSULTAR SI EL LIBRO YA EXISTE
    const q = "SELECT * FROM libro WHERE titulo = ?";
    db.query(q, [titulo], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(409).json("Este libro ya se encuentra registrado");

      // INSERTAR EL LIBRO
      const libroQuery =
        "INSERT INTO libro (titulo, autor, editorial, edicion, descripcion, pnf, fecha_publicacion) VALUES (?, ?, ?, ?, ?, ?, ?)";

      const libroValues = [
        titulo,
        autor,
        editorial,
        edicion,
        descripcion,
        pnf,
        fecha_publicacion,
      ];

      db.query(libroQuery, libroValues, (err, libroData) => {
        if (err) return res.status(500).json(err);

        // REGISTRAR LOS EJEMPLARES
        const ejemplarValues = [];

        for (let i = 0; i < cantidad; i++) {
          const codigo_ejemplar = uuidv4(); // Genera un código único para el ejemplar
          ejemplarValues.push(["disponible", codigo_ejemplar, libroData.insertId]);
        }

        const ejemplarQuery =
          "INSERT INTO ejemplar (estado, codigo_ejemplar, id_libro) VALUES ?";
        
        db.query(ejemplarQuery, [ejemplarValues], (err, ejemplarData) => {
          if (err) return res.status(500).json(err);

          return res.status(200).json("Libro registrado correctamente");
        });
      });
    });
  } catch (error) {
    // Manejar errores aquí
    console.error(error);
    res.status(500).json(error.message);
  }
};


//Actualizar libro
export const updateBook = async (req, res) => {
  try {
    const { id_libro,  titulo, autor, cantidad, editorial, edicion, descripcion, pnf, fecha_publicacion } = req.body;

    // VALIDAR CAMPOS
    if (!id_libro) {
      return res.status(400).json({ message: "El id_libro es requerido para actualizar el libro" });
    }

    // CONSULTAR SI EL LIBRO EXISTE
    const checkBookQuery = "SELECT * FROM libro WHERE id_libro = ?";
    db.query(checkBookQuery, [id_libro], (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }

      if (data.length === 0) {
        return res.status(404).json("El libro no existe, no se puede actualizar");
      }

      const updateQuery =
      "UPDATE libro SET titulo = ?, autor = ?, cantidad = ?, editorial = ?, edicion = ?, descripcion = ?, pnf = ?, fecha_publicacion = ? WHERE id_libro = ?";
    
    const updateValues = [
      titulo || data[0].titulo,
      autor || data[0].autor,
      cantidad != null ? cantidad + data[0].cantidad : data[0].cantidad,
      editorial || data[0].editorial,
      edicion || data[0].edicion,
      descripcion || data[0].descripcion,
      pnf || data[0].pnf,
      fecha_publicacion || data[0].fecha_publicacion,
      id_libro
    ];  
     
      db.query(updateQuery, updateValues, (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json(err);
        }
          
  
          // REGISTRAR LOS EJEMPLARES
          const ejemplarValues = [];
          if(cantidad > 0) {
             for (let i = 0; i < cantidad; i++) {
            const codigo_ejemplar = uuidv4(); // Genera un código único para el ejemplar
            ejemplarValues.push(["disponible", codigo_ejemplar, id_libro]);
          }

          const ejemplarQuery =
          "INSERT INTO ejemplar (estado, codigo_ejemplar, id_libro) VALUES ?";
        
        db.query(ejemplarQuery, [ejemplarValues], (err, ejemplarData) => {
          if (err) return res.status(500).json(err);
           console.log(err) 
           
        });
  
          } 
          return res.status(200).json("Libro actualizado correctamente");
          
        });
         
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en la actualización del libro" });
  }
};

//OBTENER TODOS LOS LIBROS
  export const getAllBooks = async (req, res) => {
    try {
      // Consulta para obtener todos los libros ordenados por título
      const query = "SELECT * FROM libro ORDER BY titulo";
      
      db.query(query, (err, data) => {
        if (err) return res.status(500).json(err);
  
        // Devolver la lista de libros ordenados por título
        return res.status(200).json(data);
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener la lista de libros" });
    }
  };

 //OBTENER TODOS LOS LIBROS
 export const getAllBooksAndCopies = async (req, res) => {
  try {
    // Consulta para obtener todos los libros ordenados por título
    const query = "SELECT libro.*, GROUP_CONCAT(ejemplar.id_ejemplar ORDER BY ejemplar.id_ejemplar) AS ejemplares_ids FROM libro LEFT JOIN ejemplar ON libro.id_libro = ejemplar.id_libro GROUP BY libro.id_libro;";
    
    db.query(query, (err, data) => {
      if (err) return res.status(500).json(err);

      // Devolver la lista de libros ordenados por título
      return res.status(200).json(data);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la lista de libros" });
  }
}; 
 
// OBTENER UN LIBRO POR SU CÓDIGO
export const getBookByCode = async (req, res) => {
    try {
      const { codigo } = req.params;
  
      // Consulta para obtener un libro por su código
      const query = "SELECT * FROM libro WHERE id_libro = ?";
      
      db.query(query, [codigo], (err, data) => {
        if (err) return res.status(500).json(err);
  
        if (data.length === 0) {
          return res.status(404).json("Libro no encontrado");
        }
  
        // Devolver el libro encontrado en la respuesta JSON
        return res.status(200).json(data[0]);
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener el libro" });
    }
  };
  
//OBTENER LIBROS POR PNF 
export const getBookByPnf = async (req, res) => {
    try {
      const { pnf } = req.params;
  
      // Consulta para obtener un libro por su código
      const query = "SELECT * FROM libro WHERE pnf = ?";
      
      db.query(query, [pnf], (err, data) => {
        if (err) return res.status(500).json(err);
  
        if (data.length === 0) {
          return res.status(404).json("Libro no encontrado");
        }
  
        // Devolver el libro encontrado en la respuesta JSON
        return res.status(200).json(data);
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener el libro" });
    }
  };

//OBTENER LIBROS POR MAYOR NUMERO DE CONSULTAS
export const getBookByRes = async (req, res) => {
    try {
        // Consulta para obtener todos los libros ordenados por título
        const query = "SELECT * FROM libro ORDER BY consultas DESC";
        
        db.query(query, (err, data) => {
          if (err) return res.status(500).json(err);
    
          // Devolver la lista de libros ordenados por título
          return res.status(200).json(data);
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener la lista de libros" });
      }
  };

// ELIMINAR UN LIBRO POR SU CÓDIGO
export const deleteBookByCode = async (req, res) => {
    try {
      const { codigo } = req.params;
  
      // Consulta para eliminar un libro por su código
      const deleteQuery = "DELETE FROM libro WHERE id_libro = ?";
  
      db.query(deleteQuery, [codigo], (err, result) => {
        if (err) return res.status(500).json(err);
  
        if (result.affectedRows === 0) {
          return res.status(404).json("Libro no encontrado, no se pudo eliminar");
        }
  
        // Libro eliminado exitosamente
        return res.status(200).json("Libro eliminado correctamente");
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar el libro" });
    }
  };
 