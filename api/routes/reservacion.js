import express from "express"
import { createReservacion, deleteReservacion, getAllReservaciones, getReservacionById, getReservacionesByDateRange, updateReservacionEstado } from "../controllers/reservaciones.js";


const router =  express.Router();
router.post("/crear-reservacion", createReservacion);
router.put("/actualizar-reservacion/:reservacionId", updateReservacionEstado)
router.get("/obtener-reservaciones", getAllReservaciones) 
router.get("/obtener-reservaciones-fecha", getReservacionesByDateRange) 
router.get("/obtener-id/:reservacionId", getReservacionById) 
router.delete("/eliminar-reservacion/:reservacionId", deleteReservacion)


export default router