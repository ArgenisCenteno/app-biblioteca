const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
import React,{useState, useEffect} from 'react'
import Layout from '../components/ui/Layout'
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles'; 
import { DataGrid, esES } from '@mui/x-data-grid'; 
import axios from "axios"
import Swal from 'sweetalert2' 
import ReporteProyectos from './ReporteProyectos';

const PrestamosProyecto = () => {
    const [project, setProject] = useState([]);
    const theme = createTheme(
        {
          palette: {
            primary: { main: '#1976d2' },
          },
        },
        esES,
      );


      const getAllBorrowProject = async() =>{
        try {
          const {data} = await axios.get(`${apiKey}/api/borrow-project/getAllBoorwBook`)
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
        getAllBorrowProject()
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
            const { data } = await axios.delete(`${apiKey}/api/borrow-project/deleteBorrowBookByCode/${id}`);
            if (data) {
              // Si la petición tiene éxito, mostrar un mensaje de éxito
              Swal.fire({
                icon: 'success',
                title: 'Libro eliminado',
                text: data.message, // Puedes usar el mensaje que devuelve la petición
              });
              getAllBorrowProject()
              // Aquí puedes realizar cualquier otra acción que necesites después de la eliminación
            } else {
              // Si la petición no tiene éxito, mostrar un mensaje de error
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al eliminar el libro',
              });
            }
          } catch (error) {
            // Si la petición genera un error, mostrar un mensaje de error genérico
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un error inesperado al eliminar el libro',
            });
          }
        }
      };

      const columns = [
        { field: 'id_prestamo_proyecto', headerName: 'ID', width: 70 },
        { field: 'fecha_prestamo', headerName: 'Fecha', width: 110 },
        { field: 'nombre', headerName: 'Nombre', width: 90 },
        { field: 'apellido', headerName: 'Apellido', width: 90 },
        {
          field: 'pnf_solicitante',
          headerName: 'PNF', 
          width: 120,
        },
        {
          field: 'trayecto_solicitante',
          headerName: 'Trayecto',
          width: 90
        },
        { field: 'estado_prestamo_proyecto', headerName: 'Estado', width: 110 },
        { field: 'codigo_ejemplar_proyecto', headerName: 'Ejemplar', width: 140 },
        { field: 'titulo', headerName: 'Proyecto', width: 130 },
        
        {
          field: 'ver',
          headerName: 'Acciones',
          width: 160,
          renderCell: (params) => (
            <div>
             <Link to={`/sistema/detalles-proyecto/${params.row.id_prestamo_proyecto}`}>
              <button  className='btn btn-primary mr-2'>Ver</button>
            </Link>
             
            <button  className='btn btn-danger ml-2'  onClick={() => {
                              handleDelete(params.row.id_prestamo_proyecto);
                            }}>Eliminar</button>
          
            </div>
           
          ),
        },
      ];
      
  return (
    <Layout>
    <div className='bookTableHeader'>
      <div className='title'>
          <h2>Prestamos de Proyectos</h2>
        <ReporteProyectos/>
      </div>
     <div className='btnAddBook'>
      <Link to={"/sistema/prestar-proyecto"}>
       <button className='btn btn-primary'>Realizar prestamo</button>
      </Link>
      
     </div>
      
    </div>
     <div style={{ width: '100%' }}>
 <ThemeProvider theme={theme}> 
<DataGrid
  rows={project}
  columns={columns}
  pagination
  pageSize={5} 
  rowsPerPage={12}
  localeText={esES.components.MuiDataGrid.defaultProps.localeText}
  getRowId={(row) => row.id_prestamo_proyecto}
/>
</ThemeProvider > 
</div>

  </Layout>
  )
}

export default PrestamosProyecto