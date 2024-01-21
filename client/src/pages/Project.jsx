import React,{useState, useEffect } from 'react'
const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
import Layout from '../components/ui/Layout.jsx'
import Swal from 'sweetalert2';
import axios from "axios"
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid'; 
import ReportProject from './ReporteProyectos.jsx';

const Project = () => {
  const [project, setProject] = useState([]);
  


  //OBTENER TODOS LOS LIBROS

  const getAllProjects = async() =>{
    try {
      const {data} = await axios.get(`${apiKey}/api/project/getAllProjects`)
        if(data){
          setProject(data)
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

  useEffect(() => {
    getAllProjects(); 
  }, [])

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
        const { data } = await axios.delete(`${apiKey}/api/project/deleteProject/${id}`);
        if (data) {
          // Si la petición tiene éxito, mostrar un mensaje de éxito
          Swal.fire({
            icon: 'success',
            title: 'Proyecto eliminado',
            text: data.message, // Puedes usar el mensaje que devuelve la petición
          });
          getAllProjects()
          // Aquí puedes realizar cualquier otra acción que necesites después de la eliminación
        } else {
          // Si la petición no tiene éxito, mostrar un mensaje de error
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al eliminar el proyecto',
          });
        }
      } catch (error) {
        // Si la petición genera un error, mostrar un mensaje de error genérico
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error inesperado al eliminar el proyecto',
        });
      }
    }
  };

  
  const columns = [
    { field: 'id_proyecto', headerName: 'ID', width: 70 },
    { field: 'titulo', headerName: 'Título', width: 130 },
    { field: 'autor', headerName: 'Autor', width: 130 },
    {
      field: 'pnf',
      headerName: 'PNF', 
      width: 140,
    },
    {
      field: 'trayecto',
      headerName: 'Trayecto',
      width: 180
    },
     
    {
      field: 'fecha_presentacion',
      headerName: 'Fecha de Presentación',
      width: 210
    },
    
    {
      field: 'ver',
      headerName: 'Acciones',
      width: 180,
      renderCell: (params) => (
        <div>
         <Link to={`/sistema/proyecto/${params.row.id_proyecto}`}>
          <button  className='btn btn-primary mr-2'>Ver</button>
        </Link>
         
        <button  className='btn btn-danger ml-2'  onClick={() => {
                          handleDelete(params.row.id_proyecto);
                        }}>Eliminar</button>
      
        </div>
       
      ),
    },
  ];
  
  return (
    <Layout>
      <div className='bookTableHeader'>
        <div className='title'>
            <h2>Proyectos</h2>
          
        </div>
       <div className='btnAddBook'>
        <Link to={"/sistema/agregar-proyecto"}>
         <button className='btn btn-primary'>Registrar proyecto</button>
        </Link>
        
       </div>
        
      </div>
       <div style={{ width: '100%' }}>
  <DataGrid
    rows={project}
    columns={columns}
    pagination
    pageSize={5} 
    
    getRowId={(row) => row.id_proyecto}
  />
</div>
    </Layout>
  )
}

export default Project