import express from "express"
import { createCopyOfBook, deleteCopyOfBook, getCopyOfBookById } from "../controllers/copyBookController.js";

const router = express.Router();


//CREAR EJEMPLAR DE UN LIBRO
router.post("/create-copy", createCopyOfBook)
//OBTENER EJEMPLARES DE UN LIBRO
router.get("/getCopies/:codigo", getCopyOfBookById)
//ELIMINAR EJEMPLAR
router.delete("/delete-copy/:codigo", deleteCopyOfBook)

export default router