import express from "express"
import { createBorrowProject,getBorrowBookByCode, deleteBorrowBookByCode, getAllBorrowBook, getAllCopiesBookOfBorrowBook,  getBorrowBooksByDateParam, getBorrowBooksByDateRange, getBorrowBooksByReturnDateRange, getCountBorrowBookByStudentGender, getLoanCountByPnfForStudents, getReturnBooksByDateParam, updateBorrowBook, finalizarPrestamo } from "../controllers/borrowProjectController.js";
 
 
const router =  express.Router();

router.post("/createBorrowProject", createBorrowProject);
router.put("/updateBorrowBook/:id_prestamo", updateBorrowBook)
router.get("/getAllBoorwBook", getAllBorrowBook)
router.get("/getBorrwoBookDateRange", getBorrowBooksByDateRange)
router.get("/getBorrowBooksByReturnDateRange", getBorrowBooksByReturnDateRange)
router.get("/getBorrowBooksByDateParam/:interval", getBorrowBooksByDateParam)
router.get("/getReturnBooksByDateParam/:interval", getReturnBooksByDateParam)
router.get("/getLoanCountByPnfForStudents", getLoanCountByPnfForStudents)
router.get("/getCountBorrowBookByStudentGender", getCountBorrowBookByStudentGender)
router.get("/getAllCopiesBookOfBorrowBook/:codigo", getAllCopiesBookOfBorrowBook)
router.get("/getBorrowByCode/:codigo", getBorrowBookByCode)  
router.delete("/deleteBorrowBookByCode/:codigo", deleteBorrowBookByCode)
router.put("/finalizar-prestamo/:codigo", finalizarPrestamo)
 /* 


router.get("/topBorrower", getBorrowerByRes)

router.get("/getBorrowerByPnf/:pnf", getBorrowerByPnf)
router.delete("/deleteBorrower/:codigo", deleteBorrowerByCode)



*/ 
 




export default router