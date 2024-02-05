const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
import React,{useState, useEffect} from 'react'
import { DataGrid, esES } from '@mui/x-data-grid'; 
import Layout from '../components/ui/Layout'
import jsPDF from 'jspdf';
import axios from 'axios';
import  'jspdf-autotable';
import Swal from 'sweetalert2'
import { Button, Select, MenuItem } from '@mui/material';
import "../styles/Book.scss"
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';  

 
const Book = () => {

  const [book, setBook] = useState([]);
  const [selectedPnf, setSelectedPnf] = useState('');
  const [bookByPnf, setBookByPnf] = useState(null);

  const handleChangePnf = (event) => {
    setSelectedPnf(event.target.value);
  };     

  const generatePDF = (data) => {
    // Crear una nueva instancia de jsPDF
    const doc = new jsPDF();
  
    // Definir las columnas que deseas mostrar en el PDF
    const columns = ['Título', 'Autor', 'Editorial', 'Edición',  'Descripción', 'PNF', 'Fecha de Publicación', 'Fecha de Registro'];
  
    // Mapear los datos para seleccionar solo las columnas que deseas y formatear las fechas
    const rows = data.map(obj => [
      obj.titulo,
      obj.autor,
      obj.editorial,
      obj.edicion, 
      obj.descripcion,
      obj.pnf,
      formatDate(obj.fecha_publicacion),
      formatDate(obj.fecha_registro)
    ]);
  
    // Agregar un título al PDF
    doc.text('Información de libros', 10, 10);
  
    // Generar la tabla con jspdf-autotable
    doc.autoTable({
      head: [columns],
      body: rows,
    });
  
    // Guardar el PDF
    doc.save('libros.pdf');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  const handleConsultar = async () => {
    try {
      const { data } = await axios.get(`${apiKey}/api/books/getBookByPnf/${selectedPnf}`);
      setBookByPnf(data);
      generatePDF(data);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'info',
        title: 'Sin registros',
        text: 'No hay libros por este PNF',
      });
    }
  };

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
            <Select
            value={selectedPnf}
            onChange={handleChangePnf}
            displayEmpty
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="Informática">Informática</MenuItem>
            <MenuItem value="Electrónica">Electrónica</MenuItem>
            <MenuItem value="Industrial">Industrial</MenuItem>
            <MenuItem value="Higiene y seguridad">Higiene y seguridad</MenuItem>
            <MenuItem value="Instrumentación y Control">Instrumentación y Control</MenuItem>
            <MenuItem value="No aplica">No aplica</MenuItem>
          </Select>
          <Button variant="contained" onClick={handleConsultar} disabled={!selectedPnf}>
            Consultar 
          </Button>
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