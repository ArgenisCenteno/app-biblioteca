const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
import React, { useEffect, useState } from 'react'
import {useAuth} from "../context/auth.jsx"
import Navbar from '../components/ui/Navbar'
import Menu from '../components/ui/Menu'
import "../styles/Home.scss"
import logo from "../img/logo.jpg"
import Layout from '../components/ui/Layout'
import axios from 'axios'


const Home = () => {
  const [auth] = useAuth();
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalBook, setTotalBook] = useState(0)
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalProyectosPrestado, setTotalProyectosPrestados] = useState(0)
  const [totalLibrosPrestados, setTotalLibrosPrestados] = useState(0);
  const [totalSolicitantes, setTotalSolicitantes] = useState(0);



  const getAllBorrower = async() =>{
    try {
      const {data} = await axios.get(`${apiKey}/api/users/traer-usuarios`)
        if(data){
          console.log(data)
          setTotalUsers(data)
        } 

        console.log(data)
      
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error al traer los libros' 
      })
    }

  }
  const getAllBook = async() =>{
    try {
      const {data} = await axios.get(`${apiKey}/api/books/getAllBooks`)
        if(data){
          setTotalBook(data)
        } 

        console.log(data)
      
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error al traer los libros' 
      })
    }

  }

  const getAllProjects = async() =>{
    try {
      const {data} = await axios.get(`${apiKey}/api/project/getAllProjects`)
        if(data){
          setTotalProjects(data)
        } 

        console.log(data)
      
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error al traer los proyectos' 
      })
    }

  }

  const getAllBorrowProject = async() =>{
    try {
      const {data} = await axios.get(`${apiKey}/api/borrow-book/getAllBoorwBook`)
        if(data){
          setTotalLibrosPrestados(data)
        } 

        console.log(data)
      
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error al traer los proyectos' 
      })
    }

  } 

  const getAllBorrowProject2 = async() =>{
    try {
      const {data} = await axios.get(`${apiKey}/api/borrow-project/getAllBoorwBook`)
        if(data){
          setTotalProyectosPrestados(data)
        } 
       
        console.log(data)
      
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error al traer los proyectos' 
      })
    }

  }

  const getAllBorrower2 = async() =>{
    try {
      const {data} = await axios.get(`${apiKey}/api/borrower/getAllBorrower`)
        if(data){
          setTotalSolicitantes(data)
        } 

        console.log(data)
      
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error al traer los libros' 
      })
    }

  }
  useEffect(() => {
      getAllBorrower(); 
      getAllBook()
      getAllProjects()
      getAllBorrowProject()
      getAllBorrowProject2()
      getAllBorrower2()
  }, [])
  
  return (
    <>
      <Layout className="main">
         
        <div className="container row">
          
          <div className="col-md-12 ">
            <div className="card w-100 p-3">
              <h1>Bienvenido, {auth?.user?.nombre + " " + auth?.user?.apellido}</h1>
               
            </div>
           
            <div className="row mt-4">
              <div className="col-md-3 mt-3">
                <div className="card" style={{border: "none"}}>
                  <div className="card-body bg-success">
                    <h5 className="card-title text-white">Libros</h5>
                    <p className="card-text text-white p-2">{totalBook.length} </p>
                     
                  </div>
                </div>
              </div>
              <div className="col-md-3 mt-3">
                <div className="card" style={{border: "none"}}>
                  <div className="card-body  bg-danger">
                    <h5 className="card-title text-white">Proyectos</h5>
                    <p className="card-text text-white p-2">{totalProjects.length} </p> 
                     
                  </div>
                </div>
              </div>
              <div className="col-md-3 mt-3">
                <div className="card" style={{border: "none"}}>
                  <div className="card-body  bg-warning">
                    <h5 className="card-title">Prestamo de libros</h5>
                    <p className="card-text p-2">{totalLibrosPrestados.length}</p>
                    
                  </div>
                </div>
              </div>
              <div className="col-md-3 mt-3">
                <div className="card" style={{border: "none"}}>
                  <div className="card-body  bg-primary">
                    <h5 className="card-title text-white">Prestamo de proyectos</h5>
                    <p className="card-text text-white p-2">{totalProyectosPrestado.length}</p>
                    
                  </div>
                </div>
              </div>
              <div className="col-md-3 mt-3">
                <div className="card" style={{border: "none"}}>
                  <div className="card-body  bg-info">
                    <h5 className="card-title">Reservaciones</h5>
                    <p className="card-text  p-2">4</p>
                    
                  </div>
                </div>
              </div>
              <div className="col-md-3 mt-3">
                <div className="card" style={{border: "none"}}>
                  <div className="card-body  bg-secondary">
                    <h5 className="card-title text-white">Usuarios</h5>
                    <p className="card-text text-white p-2">{totalUsers.length}</p>
                    
                  </div>
                </div>
              </div>
              <div className="col-md-3 mt-3">
                <div className="card" style={{border: "none"}}>
                  <div className="card-body  bg-success">
                    <h5 className="card-title text-white">Solicitantes</h5>
                    <p className="card-text text-white p-2">{totalSolicitantes.length}</p>
                    
                  </div>
                </div>
              </div>
             
            </div>
              
          </div>
        </div>
     
      </Layout>
  </>
  )
}

export default Home