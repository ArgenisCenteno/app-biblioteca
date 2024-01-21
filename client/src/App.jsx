import { useState } from 'react'
import { Routes, Route } from "react-router-dom"; 
import Login from './pages/Login';
import Home from './pages/Home';
import PrivateRoute from './routes/private';
import Book from './pages/Book';
import CreateBook from './pages/CreateBook';
import BookDetails from './pages/BookDetails';
import Project from './pages/Project';
import CreateProject from './pages/CreateProject';
import ProjectDetails from './pages/ProjectDetails';
import Solicitantes from './pages/Solicitantes';
import CreateBorrower from './pages/CreateBorrower';
import UpdateBorrower from './pages/UpdateBorrower';
import BorrowBook from './pages/BorrowBook';
import BorrowProject from './pages/BorrowProject';
import PrestamosProyecto from './pages/PrestamosProyecto';
import DetallesProyecto from './pages/DetallesProyecto';
import PrestamoLibros from './pages/PrestamoLibros';
import RecuperarClave from './pages/RecuperarClave';
import Reservaciones from './pages/Reservaciones';
import Reservar from './pages/Reservar';
import Reservacion from './pages/Reservacion';
import Usuarios from './pages/Usuarios';
import Usuario from './pages/Usuario';
import ActualizarUsuario from './pages/ActualizarUsuario'; 
import DetallesLibro from './pages/DetallesLbro';
import CambiarClave from './pages/CambiarClave';

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <>
      <Routes >
      <Route path='/' element={<Login/>} /> 
      <Route path='/recuperar-clave' element={<RecuperarClave/>} /> 
      <Route path='/cambiar-clave' element={<CambiarClave/>} />

      <Route path="/sistema" element={<PrivateRoute />}>
      <Route path='inicio' element={<Home/>} />  
      <Route path='libros' element={<Book/>} />  
      <Route path='agregar-libro' element={<CreateBook/>} />
      <Route path='libro/:codigo' element={<BookDetails/>} />
      <Route path='proyectos' element={<Project/>} />
      <Route path='agregar-proyecto' element={<CreateProject/>} />
      <Route path='proyecto/:codigo' element={<ProjectDetails/>} />
      <Route path='solicitantes' element={<Solicitantes/>} />
      <Route path='agregar-solicitante' element={<CreateBorrower/>} />
      <Route path='solicitante/:codigo' element={<UpdateBorrower/>} />
      <Route path='prestar-libro' element={<BorrowBook/>} />
      <Route path='prestar-proyecto' element={<BorrowProject/>} />
      <Route path='prestamos-proyectos' element={<PrestamosProyecto/>} />
      <Route path='detalles-proyecto/:codigo' element={<DetallesProyecto/>} />
      <Route path='detalles-libro/:codigo' element={<DetallesLibro/>} />
      
      <Route path='prestamos-libros' element={<PrestamoLibros/>} />
      <Route path='reservaciones' element={<Reservaciones/>} />
      <Route path='reservar' element={<Reservar/>} />
      <Route path='reservacion/:codigo' element={<Reservacion/>} />
      <Route path='usuarios' element={<Usuarios/>} />
      <Route path='crear-usuario' element={<Usuario/>} />
      <Route path='usuario/:codigo' element={<ActualizarUsuario/>} />
      </Route>

      </Routes> 

      
      
    </>
  )
}

export default App
