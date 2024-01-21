const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
import React, { useState, useEffect } from 'react'
import Layout from '../components/ui/Layout'
import axios from "axios"
import Swal from "sweetalert2"
 
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';

const inicialState = {
  id_solicitante: "",  
  nombre: "",
  apellido: "",
  cedula: "",
  sexo: "", 
  pnf: "",
  trayecto: "",
  ocupacion: "" 
}

const UpdateBorrower = () => {
    
    const params = useParams();
  const [formData, setFormData] = useState(inicialState)
  const [inputError, setInputError] = useState("")


  const getSingleBook = async () => {
    try {
        const { data } = await axios.get(`${apiKey}/api/borrower/getBorrowerByCode/${params.codigo}`);
        console.log(data)
        if (data) {
            
          setFormData({
            ...formData,
            id_solicitante: data.id_solicitante,  
             nombre: data.nombre,
             apellido: data.apellido,
             cedula: data.cedula,
             sexo: data.sexo, 
             pnf: data.pnf,
             trayecto: data.trayecto,
             ocupacion: data.ocupacion 
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    
    useEffect(() => {
        getSingleBook()
        
      }, [])
   
  const handleChange = (event) => {
    const { name, value } = event.target || event; 
    setFormData({
      ...formData,
      [name]: value,
    });
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cedula = formData.cedula.trim(); // Eliminar espacios en blanco de la cédula
  
    if (cedula.length !== 7 && cedula.length !== 8) {
      setInputError("La cédula debe tener exactamente 7 u 8 dígitos.");
    } else {
      setInputError(""); // Limpiar el mensaje de error si es válido.
   
      try {
        const { data } = await axios.put(
          `${apiKey}/api/borrower/update-borrower`,
          formData
        );
        if (data) {
          Swal.fire({
            icon: 'success',
            title: "Correcto",
            text: data
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
    }
  };
    
 
 
  return (
    <Layout  > 
    <h2 className='m-4 p-4'>Actualizar solicitante</h2>
    <form className=' m-4 p-3' onSubmit={handleSubmit}>
      <div className="row mb-3">
    <div className="col-6">
      {/* Name input */}
      <div className="form-outline">
        <label className="form-label" htmlFor="form8Example1">Nombre</label>
        <input type="text" id="form8Example1"  name='nombre' value={formData.nombre} onChange={handleChange} placeholder='Nombre' className="form-control"  required/>
      </div>
    </div>
    <div className="col-5">
      {/* Email input */}
      <div className="form-outline">
        <label className="form-label"  >Apellido</label>
        <input type="text"    name='apellido' value={formData.apellido} onChange={handleChange} placeholder='Apellido'  className="form-control" required/>
      </div>
    </div>
  </div>

  <div className="row mb-3">
    <div className="col-6">
      {/* First name input */}
      <div className="form-outline">
        <label className="form-label"  >Cédula</label>
        <input type="number"   onChange={handleChange} value={formData.cedula} placeholder='Cédula'  className="form-control" required/>
       <span className='text-danger'> {inputError}</span>
      </div>
    </div>
    <div className="col-5">
      {/* Last name input */}
      <div className="form-outline">
        <label className="form-label"  >Ocupación</label>
        <input type="text"  name='ocupacion' value={formData.ocupacion} onChange={handleChange} placeholder='Ocupación' className="form-control" required />
      </div>
    </div>
    
    
  </div>

  <div className='row mb-3'>
  <div className="col-6 ">
      {/* Email input */}
      <div className="form-outline">
        <label className="form-label"  >Sexo</label>
         <select className='form-control' name='sexo' value={formData.sexo} onChange={handleChange} required>
         <option value="">Seleccione un sexo</option>
          <option value="Hombre">Hombre</option>
          <option value="Mujer">Mujer</option>
           
         </select>
      </div>
    </div>  
  <div className="col-5">
      {/* Email input */}
      <div className="form-outline">
        <label className="form-label"  >Trayecto</label>
         <select className='form-control' name='trayecto' value={formData.trayecto}  onChange={handleChange} >
         <option value="">Seleccione un trayecto</option>
          <option value="Trayecto 1">Trayecto 1</option>
          <option value="Trayecto 2">Trayecto 2</option>
          <option value="Trayecto 3">Trayecto 3</option>
          <option value="Trayecto 4">Trayecto 4</option>
           
         </select>
       
      </div>
    </div>
    
  </div>

  <div className='row mb-3'>
  <div className="col-6">
  <div className="form-outline">
        <label className="form-label"  >PNF</label>
         <select className='form-control' name='pnf' value={formData.pnf}  onChange={handleChange} required>
         <option value="">Seleccione un PNF</option>
         <option value="Informática">Informática</option>
          <option value="Electrónica">Electronica</option>
          <option value="Industrial">Industrial</option>
          <option value="Higiene y seguridad">Higiene y seguridad</option>
           
         </select>
       
      </div>
      
    </div>
     
  </div>
  <div className='row mb-3'>
  
      <div className='col-4'>
    <button type='submit' className='btn btn-primary'>Aceptar</button>
      </div>
  </div>
  </form>
  </Layout>
  )
}

export default UpdateBorrower