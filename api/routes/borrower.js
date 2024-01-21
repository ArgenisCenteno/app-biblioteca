import express from "express"
import { createBorrower, deleteBorrowerByCode, getAllBorrowers, getBorrowerByCode,
     getBorrowerByPnf, getBorrowerByRes, updateBorrower } from "../controllers/borrowerController.js";
import { getAllCopiesBookOfBorrowBook } from "../controllers/borrowBookController.js";
 
const router =  express.Router();

router.post("/create-borrower", createBorrower);
router.put("/update-borrower", updateBorrower)
router.get("/getAllBorrower", getAllBorrowers)
router.get("/topBorrower", getBorrowerByRes)
router.get("/getBorrowerByCode/:codigo", getBorrowerByCode)
router.get("/getBorrowerByPnf/:pnf", getBorrowerByPnf)
router.delete("/deleteBorrower/:codigo", deleteBorrowerByCode)



export default router