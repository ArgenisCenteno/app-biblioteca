const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
import React,{useState, useEffect} from 'react'
import { DataGrid, esES } from '@mui/x-data-grid'; 
import Layout from '../components/ui/Layout'
import axios from "axios"
import Swal from 'sweetalert2'
import { Button } from '@mui/material';
import "../styles/Book.scss"
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles'; 

 
const Book = () => {

  const [book, setBook] = useState([]);
 
  
  const theme = createTheme(
     {
       palette: {
         primary: { main: '#1976d2' },
       },
     },
     esES,
   );

  //OBTENER TODOS LOS LIBROS

  const getAllBook = async() =>{
    try {
      const {data} = await axios.get(`${apiKey}/api/books/getAllBooks`)
        if(data){
          setBook(data)
        } 

        console.log(data)
      
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error al traer los libros' 
      })
    }

  }

  useEffect(() => {
     getAllBook(); 
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
        const { data } = await axios.delete(`${apiKey}/api/books/deleteBook/${id}`);
        if (data) {
          // Si la petición tiene éxito, mostrar un mensaje de éxito
          Swal.fire({
            icon: 'success',
            title: 'Libro eliminado',
            text: data.message, // Puedes usar el mensaje que devuelve la petición
          });
          getAllBook()
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
    { field: 'id_libro', headerName: 'ID', width: 70 },
    { field: 'titulo', headerName: 'Título', width: 130 },
    { field: 'autor', headerName: 'Autor', width: 130 },
    {
      field: 'edicion',
      headerName: 'Edicion', 
      width: 140,
    },
    {
      field: 'editorial',
      headerName: 'Editorial',
      width: 180
    },
     
    {
      field: 'fecha_publicacion',
      headerName: 'Fecha de Publicación',
      width: 210
    },
    
    {
      field: 'ver',
      headerName: 'Acciones',
      width: 180,
      renderCell: (params) => (
        <div>
         <Link to={`/sistema/libro/${params.row.id_libro}`}>
          <button  className='btn btn-primary mr-2'>Ver</button>
        </Link>
         
        <button  className='btn btn-danger ml-2'  onClick={() => {
                          handleDelete(params.row.id_libro);
                        }}>Eliminar</button>
      
        </div>
       
      ),
    },
  ];
  
  

  return (
    <Layout>
      <div className='bookTableHeader'>
        <div className='title'>
            <h2>Libros</h2>
            
        </div>
       <div className='btnAddBook'>
        <Link to={"/sistema/agregar-libro"}>
         <button className='btn btn-primary'>Registrar libro</button>
        </Link>
        
       </div>
        
      </div>
       <div style={{ width: '100%' }}>
   <ThemeProvider theme={theme}> 
  <DataGrid
    rows={book}
    columns={columns}
    pagination
    pageSize={5} 
    rowsPerPage={12}
    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
    getRowId={(row) => row.id_libro}
  />
  </ThemeProvider > 
</div>

    </Layout>
  )
}

export default Book