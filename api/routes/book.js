import express from "express"
import { createBook, deleteBookByCode, getAllBooks, getAllBooksAndCopies, getBookByCode, getBookByPnf, getBookByRes, updateBook } from "../controllers/bookController.js";

const router =  express.Router();
  
router.post("/create-book", createBook);
router.put("/update-book", updateBook)
router.get("/getAllBooks", getAllBooks)
router.get("/topBooks", getBookByRes)
router.get("/getBookByCode/:codigo", getBookByCode)
router.get("/getBookByPnf/:pnf", getBookByPnf)
router.delete("/deleteBook/:codigo", deleteBookByCode)
router.get("/getAllBooksAndCopies", getAllBooksAndCopies)



export default router