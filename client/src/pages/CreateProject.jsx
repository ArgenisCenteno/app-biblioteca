const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
import React, { useState } from 'react'
import Layout from '../components/ui/Layout'
import axios from "axios"
import Swal from "sweetalert2"

const inicialState = {
    titulo: "",
    autor: "", 
    pnf: "",
    trayecto: "",
    fecha_presentacion: "",
    cantidad: 1,
  }

const CreateProject = () => {
    
  const [formData, setFormData] = useState(inicialState)
   
  const handleChange = (event) => {
    const { name, value } = event.target || event;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) =>{
    e.preventDefault()
    if(formData.cantidad < 1){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text:  'La cantidad minima a registrar es 1', 
      })
    }
    try {
      const {data} = await axios.post(`${apiKey}/api/project/create-project`, formData);
      if(data){
        Swal.fire({
          
          icon: 'success',
          title: "Correcto",
          text: data

        })
      }
     
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text:  error.response.data, 
      })
    }
     
  } 
  return (
    <Layout>
        <h2 className='m-3 p-3'>Registrar Proyecto</h2>
      <form className=' m-4 p-3' onSubmit={handleSubmit}>
        <div className="row mb-3">
      <div className="col-6">
        {/* Name input */}
        <div className="form-outline">
          <label className="form-label" htmlFor="form8Example1">Título</label>
          <input type="text" id="form8Example1" name='titulo' onChange={handleChange} placeholder='Título' className="form-control" />
        </div>
      </div>
      <div className="col-5">
        {/* Email input */}
        <div className="form-outline">
          <label className="form-label"  >Autor(es)</label>
          <input type="text"    name='autor' onChange={handleChange} placeholder='Autor(es)'  className="form-control" />
        </div>
      </div>
    </div>
 
    <div className="row mb-3">
    <div className="col-6 ">
        {/* Email input */}
        <div className="form-outline">
          <label className="form-label"  >Trayecto</label>
           <select className='form-control' name='trayecto'  onChange={handleChange} >
           <option value="">Seleccione un trayecto</option>
            <option value="Trayecto 1">Trayecto 1</option>
            <option value="Trayecto 2">Trayecto 2</option>
            <option value="Trayecto 3">Trayecto 3</option>
            <option value="Trayecto 4">Trayecto 4</option>
            <option value="Trayecto 5">Trayecto 5</option>
           </select>
        </div> 
      </div>
      <div className="col-5">
        {/* Last name input */}
        <div className="col-5">
        {/* Email input */}
        <div className="form-outline">
          <label className="form-label" >Fecha de presentacion</label>
          <input type="date"   name='fecha_presentacion'  onChange={handleChange}  className="form-control" />
        </div>
      </div>
      </div>
      
      
    </div>

    <div className='row mb-3'>
    <div className="col-6 ">
        {/* Email input */}
        <div className="form-outline">
          <label className="form-label"  >PNF</label>
           <select className='form-control' name='pnf'  onChange={handleChange} >
           <option value="">Seleccione un PNF</option>
            <option value="Informática">Informática</option>
            <option value="Electrónica">Electronica</option>
            <option value="Industrial">Industrial</option>
            <option value="Higiene y seguridad">Higiene y seguridad</option>
           </select>
        </div>
      </div>  
    <div className="col-5">
        {/* Email input */}
        <div className="form-outline">
        <div className="form-outline">
          <label className="form-label"  >Cantidad</label>
          <input type='number' min="1"   name='cantidad' placeholder='Cantidad' value={formData.cantidad}  onChange={handleChange}  className="form-control" />
        </div>
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

export default CreateProject