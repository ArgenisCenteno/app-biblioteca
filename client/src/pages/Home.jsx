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
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);

  useEffect(() => {
    const getTotals = async () => {
      try {
        const responseBooks = await axios.get(`${apiKey}/api/panel/totalBooks`);
        setTotalBooks(responseBooks.data.length) 

        const responseProject = await axios.get(`${apiKey}/api/panel/totalProjects`)
        setTotalProjects(responseProject.data.length)
        
      } catch (error) {
        console.log(error);  
      }
    };

    getTotals();
   
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
                    <p className="card-text text-white p-2">{totalBooks}</p>
                     
                  </div>
                </div>
              </div>
              <div className="col-md-3 mt-3">
                <div className="card" style={{border: "none"}}>
                  <div className="card-body  bg-danger">
                    <h5 className="card-title text-white">Proyectos</h5>
                    <p className="card-text text-white p-2">{totalProjects}</p> 
                     
                  </div>
                </div>
              </div>
              <div className="col-md-3 mt-3">
                <div className="card" style={{border: "none"}}>
                  <div className="card-body  bg-warning">
                    <h5 className="card-title">Prestamo de libros</h5>
                    <p className="card-text p-2">4</p>
                    
                  </div>
                </div>
              </div>
              <div className="col-md-3 mt-3">
                <div className="card" style={{border: "none"}}>
                  <div className="card-body  bg-primary">
                    <h5 className="card-title text-white">Prestamo de proyectos</h5>
                    <p className="card-text text-white p-2">4</p>
                    
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
                    <p className="card-text text-white p-2">4</p>
                    
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