import {db} from "../connect.js"
export const totalBooks = async(req, res) =>{
    try {
      //Consultar
      const query = "SELECT * FROM libro";
      db.query(query, (err, data) => {
        if (err) return res.status(500).json(err);
  
        // Devolver la lista de libros  
        return res.status(200).json(data);
      });  
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener la lista de libros" });
    } 
}
export const totalProject = async(req, res) =>{
    try {
      //Consultar
      const query = "SELECT * FROM proyecto";
      db.query(query, (err, data) => {
        if (err) return res.status(500).json(err);
  
        // Devolver la lista de libros  
        return res.status(200).json(data);
      });  
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener la lista de libros" });
    } 
}

export const totalSolicitante = async(req, res) =>{
    try {
      //Consultar
      const query = "SELECT * FROM solicitante";
      db.query(query, (err, data) => {
        if (err) return res.status(500).json(err);
  
        // Devolver la lista de libros  
        return res.status(200).json(data);
      });  
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener la lista de libros" });
    } 
}

export const totalBooking = async(req, res) =>{
    try {
      //Consultar
      const query = "SELECT * FROM reservacion";
      db.query(query, (err, data) => {
        if (err) return res.status(500).json(err);
  
        // Devolver la lista de libros  
        return res.status(200).json(data);
      });  
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener la lista de libros" });
    } 
}
export const totalUsers = async(req, res) =>{
    try {
      //Consultar
      const query = "SELECT * FROM usuario";
      db.query(query, (err, data) => {
        if (err) return res.status(500).json(err);
  
        // Devolver la lista de libros  
        return res.status(200).json(data);
      });  
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener la lista de libros" });
    } 
}

export const totalPrestamoLibros = async(req, res) =>{
    try {
      //Consultar
      const query = "SELECT * FROM prestamo";
      db.query(query, (err, data) => {
        if (err) return res.status(500).json(err);
  
        // Devolver la lista de libros  
        return res.status(200).json(data);
      });  
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener la lista de libros" });
    } 
}

export const totalPrestamoProyectos = async(req, res) =>{
    try {
      //Consultar
      const query = "SELECT * FROM prestamo_proyecto";
      db.query(query, (err, data) => {
        if (err) return res.status(500).json(err);
  
        // Devolver la lista de libros  
        return res.status(200).json(data);
      });  
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener la lista de libros" });
    } 
}