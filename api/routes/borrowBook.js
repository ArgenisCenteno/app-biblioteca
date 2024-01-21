import express from "express"
import { createBorrowBook, deleteBorrowBookByCode, finalizarPrestamoLibro, getAllBorrowBook, getAllCopiesBookOfBorrowBook,  getBorrowBookByCodeNew, getBorrowBooksByDateParam, getBorrowBooksByDateRange, getBorrowBooksByReturnDateRange, getCountBorrowBookByStudentGender, getLoanCountByPnfForStudents, getReturnBooksByDateParam, updateBorrowBook } from "../controllers/borrowBookController.js";
 
 
 
const router =  express.Router();

router.post("/createBorrowBook", createBorrowBook);
router.put("/updateBorrowBook/:id_prestamo", updateBorrowBook)
router.get("/getAllBoorwBook", getAllBorrowBook)
router.get("/getBorrwoBookDateRange", getBorrowBooksByDateRange)
router.get("/getBorrowBooksByReturnDateRange", getBorrowBooksByReturnDateRange)
router.get("/getBorrowBooksByDateParam/:interval", getBorrowBooksByDateParam)
router.get("/getReturnBooksByDateParam/:interval", getReturnBooksByDateParam)
router.get("/getLoanCountByPnfForStudents", getLoanCountByPnfForStudents)
router.get("/getCountBorrowBookByStudentGender", getCountBorrowBookByStudentGender)
router.get("/getAllCopiesBookOfBorrowBook/:codigo", getAllCopiesBookOfBorrowBook)
router.delete("/deleteBorrowBookByCode/:codigo", deleteBorrowBookByCode)
router.get("/getBorrowByCode/:codigo", getBorrowBookByCodeNew)  
router.put("/finalizar-prestamo/:codigo", finalizarPrestamoLibro)
 /* 


router.get("/topBorrower", getBorrowerByRes)

router.get("/getBorrowerByPnf/:pnf", getBorrowerByPnf)
router.delete("/deleteBorrower/:codigo", deleteBorrowerByCode)



*/ 
 




export default router