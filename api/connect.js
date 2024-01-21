import mysql from "mysql";

export const db = mysql.createConnection({
    host: "localhost",
    user: "root", 
    password: "",
    database: "db_biblioteca"

 
})

if(db){
    console.log("Conexion creada")
}else{
    console.log("Sin conectar")
}