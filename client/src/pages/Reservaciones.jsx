const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
import React,{useState, useEffect} from 'react'
import Layout from '../components/ui/Layout'
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles'; 
import { DataGrid, esES } from '@mui/x-data-grid'; 
import axios from "axios"
import Swal from 'sweetalert2'

const Reservaciones = () => {
    const [reservaciones, setReservaciones] = useState([]);
    const theme = createTheme(
        {
          palette: {
            primary: { main: '#1976d2' },
          },
        },
        esES,
      );


      const getAllReservaction = async() =>{
        try {
          const {data} = await axios.get(`${apiKey}/api/reservaciones/obtener-reservaciones`)
            if(data){
              setReservaciones(data)
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
    getAllReservaction()
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
        const { data } = await axios.delete(`${apiKey}/api/reservaciones/eliminar-reservacion/${id}`);
        if (data) {
          // Si la petición tiene éxito, mostrar un mensaje de éxito
          Swal.fire({
            icon: 'success',
            title: 'Reservación eliminada',
            text: data.message, // Puedes usar el mensaje que devuelve la petición
          });
          getAllReservaction()
          // Aquí puedes realizar cualquier otra acción que necesites después de la eliminación
        } else {
          // Si la petición no tiene éxito, mostrar un mensaje de error
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al eliminar la reservación',
          });
        }
      } catch (error) {
        // Si la petición genera un error, mostrar un mensaje de error genérico
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error inesperado la reservación',
        });
      }
    }
  };

  const columns = [
    { field: 'id_reservacion', headerName: 'ID', width: 60 },
    { field: 'actividad', headerName: 'Actividad', width: 140 },
    { field: 'fecha_inicio', headerName: 'Fecha Inicio', width: 190 },
    {
      field: 'fecha_culminacion',
      headerName: 'Culminación', 
      width: 190,
    },
    {
      field: 'nombre_completo',
      headerName: 'Solicitante',
      width: 180
    }, 
    {
        field: 'estado',
        headerName: 'Estado',
        width: 120
      },
    
    {
      field: 'ver',
      headerName: 'Acciones',
      width: 180,
      renderCell: (params) => (
        <div>
         <Link to={`/sistema/reservacion/${params.row.id_reservacion}`}>
          <button  className='btn btn-primary mr-2'>Ver</button>
        </Link>
         
        <button  className='btn btn-danger ml-2'  onClick={() => {
                          handleDelete(params.row.id_reservacion);
                        }}>Eliminar</button>
      
        </div>
       
      ),
    },
  ];

  return (
    <Layout>
    <div className='bookTableHeader'>
      <div className='title'>
          <h2>Reservaciones</h2>
          
      </div>
     <div className='btnAddBook'>
      <Link to={"/sistema/reservar"}>
       <button className='btn btn-primary'>Realizar reservación</button>
      </Link>
      
     </div>
      
    </div>
     <div style={{ width: '100%' }}>
 <ThemeProvider theme={theme}> 
<DataGrid
  rows={reservaciones}
  columns={columns}
  pagination
  pageSize={5} 
  rowsPerPage={12}
  localeText={esES.components.MuiDataGrid.defaultProps.localeText}
  getRowId={(row) => row.id_reservacion}
/>
</ThemeProvider > 
</div>

  </Layout>

  )
}

export default Reservaciones