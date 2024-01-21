import express from "express"
import { createCopyOfProject, deleteCopyOfProject, getCopyOfProjectById } from "../controllers/copyProjectController.js";
 
const router = express.Router();


//CREAR EJEMPLAR DE UN LIBRO
router.post("/create-copy", createCopyOfProject)
//OBTENER EJEMPLARES DE UN LIBRO
router.get("/getCopies/:codigo", getCopyOfProjectById)
//ELIMINAR EJEMPLAR
router.delete("/delete-copy/:codigo", deleteCopyOfProject)

export default router