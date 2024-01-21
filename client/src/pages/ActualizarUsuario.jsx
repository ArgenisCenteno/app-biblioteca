const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
import React, { useEffect, useState } from 'react'
import Layout from '../components/ui/Layout'
import axios from "axios"
import Swal from "sweetalert2"
import Select from 'react-select';
import { useParams } from 'react-router-dom';

const inicialState = {
    nombre: "",
    apellido: "",
    email: "", 
    cedula: "" 
  }

const ActualizarUsuario = () => {

    const params = useParams();
    const [formData, setFormData] = useState(inicialState)
    const [inputError, setInputError] = useState("")
    const [solicitante, setSolicitantes]  = useState([])
    const [selectBorrowerOption, setSelectBorrowerOption] = useState("") 
  const [nombre, setNombre] = useState(""); 

    const handleChange = (event) => {
      const { name, value } = event.target || event; 
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const fetchBorrower = async () =>{
        try {
          const response = await axios.get(`${apiKey}/api/users/traer-usuario/${params.codigo}` );
          const solicitantes = response.data; 
          setFormData({
            ...formData,
            nombre: solicitantes.nombre,
             apellido: solicitantes.apellido,
            email: solicitantes.email, 
             cedula: solicitantes.cedula 

          });
       setNombre(solicitantes.nombre_completo)
        } catch (error) {
          console.error('Error al obtener los datos', error)
        }
      }
    
      
 

useEffect(() => {
        fetchBorrower() 
      }, [])

    
      useEffect(() => {
        fetchBorrower()
      }, [])

    const handleSubmit = async (e) => {
      e.preventDefault();
     
        setInputError(""); // Limpiar el mensaje de error si es válido.
     
        try {
          const { data } = await axios.put(
            `${apiKey}/api/users/actualizar-usuario/${params.codigo}`,
            formData
          );
          if (data) {
            

            Swal.fire({
              icon: 'success',
              title: "Correcto",
              text: data.message
            });
 
          }
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response.data
          });
    
      }
    };

  return (
    <Layout  > 
      <h2 className='m-4 p-4'>Actualizar usuario</h2>
      <form className=' m-4 p-3' onSubmit={handleSubmit}>
        <div className="row mb-3">
      <div className="col-6">
        {/* Name input */}
        <div className="form-outline">
          <label className="form-label" htmlFor="form8Example1">Nombre</label>
          <input type="text" id="form8Example1" value={formData.nombre}  name='nombre' onChange={handleChange} placeholder='Nombre' className="form-control"  required/>
        </div>
      </div>
      <div className="col-5">
        {/* Email input */}
        <div className="form-outline">
          <label className="form-label"  >Apellido</label>
          <input  type="text"  name='apellido' value={formData.apellido} onChange={handleChange} placeholder='Apellido'  className="form-control" required/>
        </div>
      </div>
    </div>
 
    <div className="row mb-3">
      <div className="col-6">
        {/* First name input */}
        <div className="form-outline">
        <label className="form-label"  >Email</label>
          <input  type="email" name='email' value={formData.email} onChange={handleChange} placeholder='Email'  className="form-control" required/>
         <span className='text-danger'> {inputError}</span>
        </div>
      </div>
      <div className="col-5 mb-3">
        {/* Last name input */}
        <div className="form-outline">
          <label className="form-label"  >Cédula</label>
          
          <input  type="number" name='cedula' value={formData.cedula} onChange={handleChange} placeholder='Email'  className="form-control" required/>
         <span className='text-danger'> {inputError}</span>
         
        </div>
      </div>
      
      
    </div>

     
    
   <div className='col-4'>
      <button type='submit' className='btn btn-primary'>Aceptar</button>
        
    </div>
    </form>
    </Layout>
  )
}

export default ActualizarUsuario