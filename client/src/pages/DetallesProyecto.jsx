const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
import React, { useState, useEffect } from 'react';
import Layout from '../components/ui/Layout';
import axios from 'axios';
import { Typography, Paper, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';


const columnsSolicitante = [
  { field: 'id_solicitante', headerName: 'ID ', width: 70 },
  { field: 'nombre_solicitante', headerName: 'Nombre', width: 130 },
  { field: 'apellido_solicitante', headerName: 'Apellido', width: 130 },
  { field: 'cedula_solicitante', headerName: 'Cédula', width: 140 },
  { field: 'sexo_solicitante', headerName: 'Sexo', width: 110 },
  { field: 'pnf_solicitante', headerName: 'PNF', width: 120 },
  { field: 'trayecto_solicitante', headerName: 'Trayecto', width: 120 },
  { field: 'ocupacion_solicitante', headerName: 'Ocupación', width: 120 } 
];

const columnsEjemplar = [
  { field: 'codigo_ejemplar', headerName: 'Código del Ejemplar', width: 150 },
  { field: 'id_proyecto', headerName: 'ID Proyecto', width: 150 },
  { field: 'estado_ejemplar', headerName: 'Estado del Ejemplar', width: 150 },
  { field: 'titulo_proyecto', headerName: 'Proyecto', width: 420 },
];

const columnsPrestamo = [
  { field: 'id_prestamo_proyecto', headerName: 'ID Préstamo', width: 150 },
  { field: 'fecha_prestamo', headerName: 'Fecha de Préstamo', width: 150 },
  { field: 'fecha_devolucion', headerName: 'Fecha de Devolución', width: 150 },
  { field: 'estado_prestamo', headerName: 'Estado del Préstamo', width: 150 },
];

const DetallesProyecto = () => {
  const [data, setData] = useState({});
  const [showWarning, setShowWarning] = useState(false); // Estado para mostrar la advertencia
  const [showFinishButton, setShowFinishButton] = useState(false); // Estado para mostrar el botón de finalizar préstamo
  const params = useParams();
  const getRowId = (row) => data.id_prestamo_proyecto + 1;

    const traerInformacion = async() =>{
         // Hacer la solicitud a la API usando Axios
    axios
    .get(`${apiKey}/api/borrow-project/getBorrowByCode/${params.codigo}`)
    .then((response) => {
      console.log(response.data);
      setData(response.data);
      // Verificar la diferencia de tiempo y mostrar advertencia si es necesario
      const fechaPrestamo = new Date(response.data.fecha_prestamo);
      const fechaActual = new Date();
      const tiempoTranscurrido = fechaActual - fechaPrestamo;
      const mesesTranscurridos = tiempoTranscurrido / (1000 * 60 * 60 * 24 * 30);

      if (mesesTranscurridos >= 3) {
        setShowWarning(true);

      }

      if (response.data.estado_prestamo === 'En proceso') {
          setShowFinishButton(true);
        }
    })
    .catch((error) => {
      console.error('Error al obtener los datos de la API:', error);
    });
    }

  useEffect(() => {
    traerInformacion()
  }, []);

  const handleFinishClick = () => {
    Swal.fire({
      title: '¿Finalizar el préstamo?',
      text: '¿Está seguro de que desea finalizar el préstamo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, finalizar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Hacer la llamada a la API para finalizar el préstamo
        axios
          .put(`${apiKey}/api/borrow-project/finalizar-prestamo/${params.codigo}`)
          .then(() => {
            Swal.fire('¡Préstamo finalizado!', 'El préstamo se ha finalizado con éxito.', 'success');
          })
          traerInformacion()
          .catch((error) => {
            console.error('Error al finalizar el préstamo:', error);
            Swal.fire('Error', 'Hubo un error al finalizar el préstamo.', 'error');
          });
      }
    });
  };

  return (
    <Layout>
      <h2 className='m-3 p-3'>
        Detalles del Proyecto
      </h2>
 {/* Mostrar advertencia en rojo si es necesario */}
 {showWarning && (
        <div className="alert alert-danger m-3" role="alert">
          ¡Advertencia! Ha pasado más de 3 meses desde el préstamo.
        </div>
      )}
      <Paper className='m-3 p-3'>
        <h6  >
          Información del Préstamo
        </h6>
        <div style={{ width: '100%' }}>
          <DataGrid
            rows={[data]}
            pagination
            pageSize={5} 
            rowsPerPage={12}
            columns={columnsPrestamo} 
            getRowId={getRowId}
          />
        </div>
      </Paper>

      {/* Tabla de Información del Solicitante */}
      <Paper className='m-3 p-3'>
        <h6   >
          Información del Solicitante
        </h6>
        <div style={{  width: '100%' }}>
          <DataGrid
           rows={[data]}
            columns={columnsSolicitante}
            pagination
            pageSize={5} 
            rowsPerPage={12}
            getRowId={getRowId}
          />
        </div>
      </Paper>

      {/* Tabla de Información del Ejemplar */}
      <Paper className='m-3 p-3'>
        <h6  >
          Información del Ejemplar
        </h6>
        <div style={{  width: '100%' }}>
          <DataGrid
            rows={[data]}
            columns={columnsEjemplar}
            pagination
            pageSize={5} 
            rowsPerPage={12} 
            getRowId={getRowId}
          />
        </div>
      </Paper>

      {/* Tabla de Información del Préstamo */}
      
      {showFinishButton && (
      <button className='btn btn-primary m-3 p-3'onClick={handleFinishClick} >
        Finalizar Préstamo
      </button>
      )}
    </Layout>
  );
};

export default DetallesProyecto;
