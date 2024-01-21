import express from "express";
import { createProject, deleteProyectByCode, getAllProjects, getProjectByCode, getProjectByPnf, getProyectByRes, updateProject } from "../controllers/projectController.js";

const router = express.Router();

router.post("/create-project", createProject);
router.put("/update-project", updateProject)
router.get("/getAllProjects", getAllProjects)
router.get("/topProjects", getProyectByRes)
router.get("/getProjectByCode/:codigo", getProjectByCode)
router.get("/getProjectByPnf/:pnf", getProjectByPnf)
router.delete("/deleteProject/:codigo", deleteProyectByCode)

export default router