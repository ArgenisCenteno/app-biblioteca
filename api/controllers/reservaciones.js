 
import { db } from "../connect.js";

// Controlador para crear una nueva reservación
export const createReservacion = async (req, res) => {
  try {
    const { actividad, fecha_inicio, fecha_culminacion, id_solicitante } = req.body;
     
    // Verificar si hay alguna reservación que tenga conflicto de horas
    const conflictedReservacion = await db.query(
      'SELECT * FROM reservacion WHERE ' +
      '(fecha_inicio >= ? AND fecha_inicio < ?) OR ' +
      '(fecha_culminacion > ? AND fecha_culminacion <= ?)',
      [fecha_inicio, fecha_culminacion, fecha_inicio, fecha_culminacion]
    );

    if (conflictedReservacion.length > 0) {
      return res.status(400).json({ error: 'Conflicto de horas con otra reservación.' });
    }

    // Crear la nueva reservación
    const query = 'INSERT INTO reservacion (actividad, fecha_inicio, fecha_culminacion, id_solicitante, estado) VALUES (?, ?, ?, ?, ?)';
    const result = await db.query(query, [actividad, fecha_inicio, fecha_culminacion, id_solicitante, "activo"]);
 
      res.status(201).json({ message: 'Reservación creada con éxito.' });
 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


// Controlador para actualizar el estado de una reservación a "finalizado"
export const updateReservacionEstado = async (req, res) => {
    try {
      const { reservacionId } = req.params;
  
      // Verificar si la reservación existe
      const existingReservacion = await db.query(
        'SELECT * FROM reservacion WHERE id_reservacion = ?',
        [reservacionId]
      );
  
      if (existingReservacion.length === 0) {
        return res.status(404).json({ error: 'Reservación no encontrada.' });
      }
  
  
      // Actualizar el estado de la reservación a "finalizado"
      const query = 'UPDATE reservacion SET estado = ? WHERE id_reservacion = ?';
      const result = await db.query(query, ['finalizada', reservacionId]); 
      res.status(200).json({ message: 'Reservación actualizada a "finalizado" con éxito.' });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  // Controlador para eliminar una reservación por su ID
export const deleteReservacion = async (req, res) => {
    try {
      const { reservacionId } = req.params;
  
      // Verificar si la reservación existe
      const existingReservacion = await db.query(
        'SELECT * FROM reservacion WHERE id_reservacion = ?',
        [reservacionId]
      );
  
      if (existingReservacion.length === 0) {
        return res.status(404).json({ error: 'Reservación no encontrada.' });
      }
  
      // Eliminar la reservación de la base de datos
      const query = 'DELETE FROM reservacion WHERE id_reservacion = ?';
      const result = await db.query(query, [reservacionId]);
   
        res.status(200).json({ message: 'Reservación eliminada con éxito.' });
 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  

 
// Controlador para obtener todas las reservaciones con nombres completos de los solicitantes
export const getAllReservaciones = async (req, res) => {
  try {
    const query = `
      SELECT  r.id_reservacion, r.actividad, r.fecha_inicio, r.fecha_culminacion, r.id_solicitante, r.estado,
      CONCAT(s.nombre, ' ', s.apellido) AS nombre_completo 
FROM reservacion AS r
INNER JOIN solicitante AS s ON r.id_solicitante = s.id_solicitante
    `;

    db.query(query, (err, data) => {
      if (err) return res.status(500).json(err);

      // Devolver la lista 
      return res.status(200).json(data);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getReservacionById = async (req, res) => {
  try {
    const { reservacionId } = req.params;
    const query = `
      SELECT r.*, CONCAT(s.nombre, ' ', s.apellido) AS nombre_completo
      FROM reservacion r
      JOIN solicitante s ON r.id_solicitante = s.id_solicitante
      WHERE r.id_reservacion = ?
    `;
    
    db.query(query, [reservacionId], (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (data.length === 0) {
        return res.status(404).json("Reservación no encontrada");
      }

      // Devolver la reservación encontrada en la respuesta JSON
      return res.status(200).json(data[0]); // Se asume que solo se devolverá una reservación
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};



  // Controlador para obtener reservaciones por rango de fecha
export const getReservacionesByDateRange = async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      const reservaciones = await db.query('SELECT * FROM reservacion WHERE fecha_inicio >= ? AND fecha_culminacion <= ?', [startDate, endDate]);
  
      res.status(200).json(reservaciones);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  