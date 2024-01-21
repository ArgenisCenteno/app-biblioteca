const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
import React, { useEffect, useState } from 'react'
import Layout from '../components/ui/Layout'
import axios from "axios"
import Swal from "sweetalert2"
import Select from 'react-select';

const inicialState = {
    actividad: "",
    fecha_inicio: "",
    fecha_culminacion: "",
    id_solicitante: "" 
  }

const Reservar = () => {


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
          const response = await axios.get(`${apiKey}/api/borrower/getAllBorrower`);
          const solicitantes = response.data;
          console.log(solicitantes);
          setSolicitantes(solicitantes)
          
        } catch (error) {
          console.error('Error al obtener los datos', error)
        }
      }
    
      useEffect(() => {
        fetchBorrower()
      }, [])
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
     
        setInputError(""); // Limpiar el mensaje de error si es válido.
     
        try {
          const { data } = await axios.post(
            `${apiKey}/api/reservaciones/crear-reservacion`,
            formData
          );
          if (data) {
            

            Swal.fire({
              icon: 'success',
              title: "Correcto",
              text: data.message
            });

            setFormData(inicialState);
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
      <h2 className='m-4 p-4'>Realizar reservación</h2>
      <form className=' m-4 p-3' onSubmit={handleSubmit}>
        <div className="row mb-3">
      <div className="col-6">
        {/* Name input */}
        <div className="form-outline">
          <label className="form-label" htmlFor="form8Example1">Actividad</label>
          <input type="text" id="form8Example1"  name='actividad' onChange={handleChange} placeholder='Actividad' className="form-control"  required/>
        </div>
      </div>
      <div className="col-5">
        {/* Email input */}
        <div className="form-outline">
          <label className="form-label"  >Fecha inicio</label>
          <input  type="datetime-local"  name='fecha_inicio' onChange={handleChange} placeholder='Fecha Inicio'  className="form-control" required/>
        </div>
      </div>
    </div>
 
    <div className="row mb-3">
      <div className="col-6">
        {/* First name input */}
        <div className="form-outline">
        <label className="form-label"  >Fecha culminacion</label>
          <input  type="datetime-local" name='fecha_culminacion' onChange={handleChange} placeholder='Fecha culminacion'  className="form-control" required/>
         <span className='text-danger'> {inputError}</span>
        </div>
      </div>
      <div className="col-5">
        {/* Last name input */}
        <div className="form-outline">
          <label className="form-label"  >Solicitante: {nombre}</label>
          <Select
    value={formData.id_solicitante}
    onChange={(selectedOption) => {
      const nombreCompleto = selectedOption.nombre;
      const selectedSolicitanteId = selectedOption.value;
      setFormData({ ...formData, id_solicitante: selectedSolicitanteId });
      setNombre(nombreCompleto); // Aquí debes usar nombreCompleto
    }}
    options={solicitante.map((borrower) => ({
      value: borrower.id_solicitante,
      nombre: borrower.nombre + " " + borrower.apellido,
      label: `${borrower.nombre} ${borrower.apellido} - ${borrower.cedula}`,
    }))}
    placeholder="Seleccionar un solicitante"
    isClearable
  />



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

export default Reservar