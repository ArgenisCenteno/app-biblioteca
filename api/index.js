import express from "express";
import dotenv from "dotenv"
import userRoutes from "./routes/user.js"
import bookRoutes from "./routes/book.js"
 import copiesBook from "./routes/copies.js"
import projectRoutes from "./routes/project.js" 
import copiesProject from "./routes/copiesProject.js"
import borrowerRoutes from "./routes/borrower.js"
import borrowBookRoutes from "./routes/borrowBook.js"
import borrowProjectRoutes from "./routes/borrowProject.js"
import dashboard from "./routes/dashboard.js"
import reservaciones from "./routes/reservacion.js"
import cors from "cors";
import morgan from "morgan";

//CONFIGURACION ENV
dotenv.config();
 
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/users", userRoutes)
app.use("/api/books", bookRoutes)
app.use("/api/copies", copiesBook)
app.use("/api/project", projectRoutes)
app.use("/api/copies-project", copiesProject)
app.use("/api/borrower/", borrowerRoutes)
app.use("/api/borrow-book/", borrowBookRoutes)
app.use("/api/borrow-project/", borrowProjectRoutes)
app.use("/api/panel/", dashboard)
app.use("/api/reservaciones/", reservaciones)

app.listen(8800, () =>{
    console.log("API TRABAJANDO")
})
