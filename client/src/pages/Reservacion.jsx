const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
import React, { useEffect, useState } from 'react'
import Layout from '../components/ui/Layout'
import axios from "axios"
import Swal from "sweetalert2"
import Select from 'react-select';
import { useParams } from 'react-router-dom';

const inicialState = {
    actividad: "",
    fecha_inicio: "",
    fecha_culminacion: "",
    id_solicitante: "",
    estado: "" 
  }

const Reservacion = () => {

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
          const response = await axios.get(`${apiKey}/api/reservaciones/obtener-id/${params.codigo}` );
          const solicitantes = response.data;
           
          const fechaInicioAjustada = new Date(solicitantes.fecha_inicio).toISOString().slice(0, 16);
const fechaCulminacionAjustada = new Date(solicitantes.fecha_culminacion).toISOString().slice(0, 16);
          setFormData({
            ...formData,
             id_reservacion: solicitantes.id_reservacion,
             actividad: solicitantes.actividad,
             fecha_inicio: fechaInicioAjustada,
  fecha_culminacion: fechaCulminacionAjustada,
             id_solicitante: solicitantes.id_solicitante,
             nombre_completo: solicitante.nombre_completo,
             estado: solicitantes.estado

          });
       setNombre(solicitantes.nombre_completo)
        } catch (error) {
          console.error('Error al obtener los datos', error)
        }
      }
    
      
  
      const fetchBorrowers = async () =>{
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
        fetchBorrowers()
      }, [])

    
      useEffect(() => {
        fetchBorrower()
      }, [])

    const handleSubmit = async (e) => {
      e.preventDefault();
     
        setInputError(""); // Limpiar el mensaje de error si es válido.
     
        try {
          const { data } = await axios.put(
            `${apiKey}/api/reservaciones/actualizar-reservacion/${params.codigo}`,
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
        <input type="text" id="form8Example1" value={formData.actividad}  name='actividad' onChange={handleChange} placeholder='Actividad' className="form-control" readOnly required/>
      </div>
    </div>
    <div className="col-6">
      {/* Name input */}
      <div className="form-outline">
        <label className="form-label" htmlFor="form8Example1s">Estado</label>
        <input type="text" id="form8Example12" value={formData.estado}  name='actividad' onChange={handleChange} placeholder='Actividad' className="form-control" readOnly required/>
      </div>
    </div>
    
  </div>

  <div className="row mb-3">
  <div className="col-6">
      {/* Email input */}
      <div className="form-outline">
        <label className="form-label"  >Fecha inicio</label>
        <input  type="datetime-local" value={formData.fecha_inicio} name='fecha_inicio' onChange={handleChange} placeholder='Fecha Inicio'  className="form-control" readOnly required/>
      </div>
    </div>

    <div className="col-6 mb-3">
      {/* First name input */}
      <div className="form-outline">
      <label className="form-label"  >Fecha culminacion</label>
        <input  type="datetime-local" value={formData.fecha_culminacion}  name='fecha_culminacion' onChange={handleChange} placeholder='Fecha culminacion'  className="form-control" readOnly required/>
       <span className='text-danger'> {inputError}</span>
      </div>
    </div>
    <div className="col-5 mb-3">
      {/* Last name input */}
      <div className="form-outline">
      <label className="form-label" >Nombre: {nombre}</label>
<Select
readOnly
  value={formData.id_solicitante}
  onChange={(selectedOption) => {
    const nombreCompleto = selectedOption.nombre;
    const selectedSolicitanteId = selectedOption.value;
    setFormData({ ...formData, id_solicitante: selectedSolicitanteId });
    setNombre(nombreCompleto); // Debes usar nombreCompleto
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

   
  
  {formData.estado === 'activo' ? ( // Verifica si la reservación está activa
          <div className='col-4'>
            <button type='submit' className='btn btn-primary'>Finalizar</button>
          </div>
        ) : null}
  </form>
  </Layout>
  )
}

export default Reservacion