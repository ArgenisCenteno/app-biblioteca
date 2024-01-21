const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
import React,{useState, useEffect} from 'react'
import Swal from 'sweetalert2'
import axios from "axios"
import Layout from '../components/ui/Layout'
import { Link, useNavigate, useParams } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid'; 
import { Button } from '@mui/material'; 


const inicialState = {
    id_proyecto: "",
    titulo: "",
    autor: "", 
    pnf: "",
    trayecto: "",
    fecha_presentacion: "",
    cantidad: 0,}

const ProjectDetails = () => {

    const [formData, setFormData] = useState(inicialState);
    const [copies, setCopies] = useState([])
    const navigate = useNavigate();
    const params = useParams();
   
   
    const handleChange = (event) => {
      const { name, value } = event.target || event;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const getSingleProject = async () => {
        try {
            const { data } = await axios.get(`${apiKey}/api/project/getProjectByCode/${params.codigo}`);
            console.log(data)
            if (data) {
                const formattedFechaPublicacion = new Date(data.fecha_presentacion).toISOString().split('T')[0];
                const formattedFechaRegistro = new Date(data.fecha_registro).toISOString().split('T')[0];
              setFormData({
                ...formData,
                id_proyecto: data.id_proyecto,
                titulo: data.titulo,
                autor: data.autor,
                trayecto: data.trayecto, 
                pnf: data.pnf,
                fecha_presentacion: formattedFechaPublicacion,
                fecha_registro: formattedFechaRegistro,
                 
              });
            }
          } catch (error) {
            console.log(error);
          }
        }; 
    const getCopiesProject = async () =>{
        try{
        const { data } = await axios.get(`${apiKey}/api/copies-project/getCopies/${params.codigo}`);
            console.log(data)
            setCopies(data)
             
          } catch (error) {
            console.log(error);
          }
        }
     
     
      useEffect(() => {
        getSingleProject()
        getCopiesProject()
      }, [])
    

     const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put(`${apiKey}/api/project/update-project`, formData);
            if(data){
                getCopiesProject()
                Swal.fire({
                  
                  icon: 'success',
                  title: "Correcto",
                  text: data
        
                })
              }
           
             
          } catch (error) {
            console.log(error);
           
          }
        }

        const handleDelete = async (id) => {
            // Mostrar un cuadro de diálogo de confirmación
            const confirmResult = await Swal.fire({
              title: '¿Estás seguro?',
              text: 'Esta acción no se puede deshacer',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Sí, eliminar',
              cancelButtonText: 'Cancelar',
            });
          
            // Si el usuario confirma la eliminación, realizar la petición
            if (confirmResult.isConfirmed) {
              try {
                const { data } = await axios.delete(`${apiKey}/api/copies-project/delete-copy/${id}`);
                if (data) {
                  // Si la petición tiene éxito, mostrar un mensaje de éxito
                  Swal.fire({
                    icon: 'success',
                    title: 'Ejemplar eliminado',
                    text: data.message, // Puedes usar el mensaje que devuelve la petición
                  });
                  getCopiesProject()
                  // Aquí puedes realizar cualquier otra acción que necesites después de la eliminación
                } else {
                  // Si la petición no tiene éxito, mostrar un mensaje de error
                  Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un error al eliminar el ejemplar',
                  });
                }
              } catch (error) {
                // Si la petición genera un error, mostrar un mensaje de error genérico
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'Hubo un error inesperado al eliminar el ejemplar',
                });
              }
            }
          };
     
      
      
      
      const columns = [
        { field: 'id_ejemplar_proyecto', headerName: 'ID', width: 80 },
        { field: 'codigo_ejemplar', headerName: 'Código', width: 320 },
        { field: 'estado', headerName: 'Estado', width: 180 },
         
        {
          field: 'ver',
          headerName: 'Ver',
          width: 180,
          renderCell: (params) => (
            
              <button  className='btn btn-danger'   onClick={() => {
                          handleDelete(params.row.id_ejemplar_proyecto);
                        }}>Eliminar</button>
            
          ),
        },
      ];

  return (
    <Layout  > 
      <h2 className='m-3 p-3'>Actualizar Proyecto</h2>
      <span className='m-3 p-3'>Registrado el {formData.fecha_registro}</span>
      <form className=' m-4 p-3' onSubmit={handleSubmit} >
        <div className="row mb-3">
      <div className="col-6">
        {/* Name input */}
        <div className="form-outline">
          <label className="form-label" htmlFor="form8Example1">Título</label>
          <input type="text" id="form8Example1" name='titulo' onChange={handleChange} value={formData.titulo}  placeholder='Título' className="form-control" />
        </div>
      </div>
      <div className="col-5">
        {/* Email input */}
        <div className="form-outline">
          <label className="form-label"  >Autor(es)</label>
          <input type="text"    name='autor' onChange={handleChange} placeholder='Autor(es)' value={formData.autor}   className="form-control" />
        </div>
      </div>
    </div>
 
    <div className="row mb-3">
    <div className="col-6 ">
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
      <div className="col-5">
      <div className="col-5">
        {/* Email input */}
        <div className="form-outline">
          <label className="form-label" >Fecha publicación</label>
          <input type="date"   name='fecha_publicacion'  onChange={handleChange} value={formData.fecha_presentacion}   className="form-control" />
        </div>
      </div>
      </div>
      
      
    </div>

    <div className='row mb-3'>
    <div className="col-6 ">
        {/* Email input */}
        <div className="form-outline">
          <label className="form-label"  >PNF</label>
           <select className='form-control' name='pnf' value={formData.pnf}   onChange={handleChange} >
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
          <label className="form-label" >Agregar ejemplares </label>
          <input type='number' min="0"   name='cantidad' placeholder='Agregar más ejemplares'    onChange={handleChange}  className="form-control" />
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
    <h2 className='m-3 p-3'>Ejemplares</h2>
    <div className='m-3 p-3' style={{ width: '99%' }}>
    <DataGrid
  rows={copies}
  columns={columns}
  pagination
  pageSize={5}
  rowsPerPageOptions={[5, 10, 20]} // Opciones de tamaño de página
  disableSelectionOnClick // Deshabilitar selección al hacer clic
  getRowId={(row) => row.id_ejemplar_proyecto}
/>
 
</div>
    </Layout>
  )
}

export default ProjectDetails