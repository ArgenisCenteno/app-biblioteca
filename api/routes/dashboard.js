import express from "express"
import { totalBooking, totalBooks, totalPrestamoLibros, totalPrestamoProyectos, totalProject, totalSolicitante, totalUsers } from "../controllers/dashboard.js"
const router =  express.Router();

router.get("/totalBooks", totalBooks)
router.get("/totalProjects", totalProject)
router.get("/totalSolicitante", totalSolicitante)
router.get("/totalReservacion", totalBooking)
router.get("/totalUsuario", totalUsers)
router.get("/prestamoProyecto", totalPrestamoProyectos)
router.get("/prestamoLibro", totalPrestamoLibros)

export default router