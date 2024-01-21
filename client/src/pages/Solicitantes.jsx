const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
import React,{useState, useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid'; 
import Layout from '../components/ui/Layout'
import axios from "axios"
import Swal from 'sweetalert2'
import { Button } from '@mui/material';
import "../styles/Book.scss"
import { Link } from 'react-router-dom';


const Solicitantes = () => {
    const [borrower, setBorrower] = useState([]);
  


    //OBTENER TODOS LOS Solicitantes
  
    const getAllBorrower = async() =>{
      try {
        const {data} = await axios.get(`${apiKey}/api/borrower/getAllBorrower`)
          if(data){
            setBorrower(data)
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
        getAllBorrower(); 
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
          const { data } = await axios.delete(`${apiKey}/api/borrower/deleteBorrower/${id}`);
          if (data) {
            // Si la petición tiene éxito, mostrar un mensaje de éxito
            Swal.fire({
              icon: 'success',
              title: 'Solicitante eliminado',
              text: data.message, // Puedes usar el mensaje que devuelve la petición
            });
            getAllBorrower()
            // Aquí puedes realizar cualquier otra acción que necesites después de la eliminación
          } else {
            // Si la petición no tiene éxito, mostrar un mensaje de error
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un error al eliminar al solicitante',
            });
          }
        } catch (error) {
            console.log(error)
          // Si la petición genera un error, mostrar un mensaje de error genérico
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error inesperado al eliminar al solicitante',
          });
        }
      }
    };
  
    
    const columns = [
      { field: 'id_solicitante', headerName: 'ID', width: 70 },
      { field: 'nombre', headerName: 'Título', width: 90 },
      { field: 'apellido', headerName: 'Autor', width: 90 },
      {
        field: 'cedula',
        headerName: 'Cédula', 
        width: 120,
      },
      {
        field: 'sexo',
        headerName: 'Sexo',
        width: 120
      },
       
      {
        field: 'pnf',
        headerName: 'PNF',
        width: 140
      },
      {
        field: 'trayecto',
        headerName: 'Trayecto',
        width: 90
      },
      {
        field: 'ocupacion',
        headerName: 'Ocupación',
        width: 130
      },
      
      {
        field: 'ver',
        headerName: 'Acciones',
        width: 170,
        renderCell: (params) => (
          <div>
           <Link to={`/sistema/solicitante/${params.row.id_solicitante}`}>
            <button  className='btn btn-primary mr-2'>Ver</button>
          </Link>
           
          <button  className='btn btn-danger ml-2'  onClick={() => {
                            handleDelete(params.row.id_solicitante);
                          }}>Eliminar</button>
        
          </div>
         
        ),
      },
    ];
    
    
  



  return (
    <Layout>
      <div className='bookTableHeader'>
        <div className='title'>
            <h2>Solicitantes</h2>
            
        </div>
       <div className='btnAddBook'>
        <Link to={"/sistema/agregar-solicitante"}>
         <button className='btn btn-primary'>Registrar solicitante</button>
        </Link>
        
       </div>
        
      </div>
       <div style={{ width: '100%' }}>
  <DataGrid
    rows={borrower}
    columns={columns}
    pagination
    pageSize={5} 
     
    
    getRowId={(row) => row.id_solicitante}
  />
</div>
    </Layout>
  )
}

export default Solicitantes 