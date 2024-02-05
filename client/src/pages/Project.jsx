import React,{useState, useEffect } from 'react'
const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
import Layout from '../components/ui/Layout.jsx'
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import axios from 'axios';
import  'jspdf-autotable';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid'; 
import ReportProject from './ReporteProyectos.jsx';
import { Button, Select, MenuItem } from '@mui/material';

const Project = () => {
  const [project, setProject] = useState([]);
  
  const [selectedPnf, setSelectedPnf] = useState('');
  const [bookByPnf, setBookByPnf] = useState(null);

  const handleChangePnf = (event) => {
    setSelectedPnf(event.target.value);
  };     

  const generatePDF = (data) => {
    // Crear una nueva instancia de jsPDF
    const doc = new jsPDF();
  
    // Definir las columnas que deseas mostrar en el PDF
    const columns = ['Título', 'Autor(es)',  'Trayecto',   'PNF', 'Fecha de Presentacion', 'Fecha de Registro'];
  
    // Mapear los datos para seleccionar solo las columnas que deseas y formatear las fechas
    const rows = data.map(obj => [
      obj.titulo,
      obj.autor,
      obj.trayecto, ,
      obj.pnf,
      formatDate(obj.fecha_presentacion),
      formatDate(obj.fecha_registro)
    ]);
  
    // Agregar un título al PDF
    doc.text('Información de Proyectos', 10, 10);
  
    // Generar la tabla con jspdf-autotable
    doc.autoTable({
      head: [columns],
      body: rows,
    });
  
    // Guardar el PDF
    doc.save('proyectos.pdf');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  const handleConsultar = async () => {
    try {
      const { data } = await axios.get(`${apiKey}/api/project/getProjectByPnf/${selectedPnf}`);
      setBookByPnf(data);
      generatePDF(data);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'info',
        title: 'Sin registros',
        text: 'No hay proyectos por este PNF',
      });
    }
  };

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