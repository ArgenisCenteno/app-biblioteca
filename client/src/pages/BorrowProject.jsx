const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
import React, { useState, useEffect } from 'react';
import Layout from '../components/ui/Layout';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Select from 'react-select';
import Swal from 'sweetalert2';

const BorrowProject = () => {

    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState('');
    const [selectedCopy, setSelectedCopy] = useState('');
    const [copies, setCopies] = useState([]);
    const [error, setError] = useState([]);
    const [successMessage, setSuccessMessage] = useState([]);
    const [selectedDataArray, setSelectedDataArray] = useState([]); // Arreglo para almacenar los datos seleccionados
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBookOption, setSelectedBookOption] = useState(null);
    const [borrower, setBorrower] = useState([])
    const [selectBorrowerOption, setSelectBorrowerOption] = useState(null)
    const [selectedBorrower, setSelectedBorrower] = useState(null);
    const [selectedBorrowers, setSelectedBorrowers] = useState([]); 
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${apiKey}/api/project/getAllProjects`);
          const booksData = response.data;
  
          // Procesar los datos para convertir la cadena de ejemplares_ids en una lista
          const processedBooks = booksData.map((book) => {
            const ejemplaresIds = book.ejemplares_ids;
            const ejemplares = ejemplaresIds ? ejemplaresIds.split(',').map(Number) : [];
            return {
              ...book,
              ejemplares_ids: ejemplares,
            };
          });
  
          console.log(processedBooks);
          setBooks(processedBooks); // Establecer la lista de libros con sus ejemplares
        } catch (error) {
          console.error('Error al obtener los datos:', error);
        }
      };
  
      const fetchBorrower = async () =>{
        try {
          const response = await axios.get(`${apiKey}/api/borrower/getAllBorrower`);
          const solicitantes = response.data;
          console.log(solicitantes);
          setBorrower(solicitantes)
          
        } catch (error) {
          console.error('Error al obtener los datos', error)
        }
      }
      fetchBorrower();
      fetchData();
    }, []);
  
    const fetchCopies = async (id_libro) => {
      try {
        const response = await axios.get(`${apiKey}/api/copies-project/getCopies/${id_libro}`);
        const booksData = response.data;
        console.log(response.data);
  
        if (booksData.length > 0) {
          // Filtrar ejemplares disponibles
          const availableCopies = booksData.filter((copy) => copy.estado === 'disponible');
  
          if (availableCopies.length > 0) {
            setCopies(availableCopies);
          } else {
            setCopies([]);
          }
        } else {
          setCopies([]);
        }
      } catch (error) {
        setCopies([]);
        console.error('Error al obtener los datos:', error);
      }
    };
  
    const handleBookChange = (selectedOption) => {
      setSelectedBookOption(selectedOption);
      setSearchTerm(''); // Borrar el campo de búsqueda cuando se selecciona un libro
      fetchCopies(selectedOption.value);
      setSelectedCopy('');
    };
    const handleCopyChange = (event) => {
      const selectedCopyId = event.target.value;
  
      // Verifica si el arreglo ya tiene tres ejemplares
      if (selectedDataArray.length <= 3) {
        // Realiza una búsqueda directa en el array de copias
        const selectedCopyObj = copies.find((copy) => copy.id_ejemplar_proyecto === Number(selectedCopyId));
  
        if (selectedCopyObj) {
          // Encuentra el libro relacionado basado en el id_libro del ejemplar seleccionado
          const relatedBook = books.find((book) => book.id_proyecto === selectedCopyObj.id_proyecto);
  
          if (relatedBook) {
            // Crea un objeto con los datos seleccionados
            const selectedData = {
              id_ejemplar_proyecto: selectedCopyObj.id_ejemplar_proyecto,
              codigo_ejemplar: selectedCopyObj.codigo_ejemplar,
              titulo: relatedBook.titulo, // Asegúrate de usar la clave correcta
              estado: selectedCopyObj.estado,
            };
  
            // Agrega los datos seleccionados a selectedDataArray
            setSelectedDataArray([...selectedDataArray, selectedData]);
            console.log(selectedDataArray);
          } else {
            console.error('No se pudo encontrar el libro relacionado.');
          }
        } else {
          console.error('No se pudo encontrar el ejemplar seleccionado.');
        }
      } else {
        console.error('Se alcanzó el límite de ejemplares seleccionados (3).');
      }
    };
  
    const handleSearchKeyDown = (event) => {
      if (event.key === 'Enter') {
        // Seleccionar el libro cuando se presiona "Enter"
        const firstMatchingBook = books.find(
          (book) => book.titulo.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (firstMatchingBook) {
          setSelectedBook(firstMatchingBook.id_libro);
          fetchCopies(firstMatchingBook.id_libro);
          setSelectedCopy('');
        }
      }
    };
  
    const handleBorrowerChange = (selectedOption) => {
      const info = {
        id_solicitante: selectedOption.value,
        cedula: selectedOption.cedula,
        nombre: selectedOption.nombre,
        apellido: selectedOption.apellido,
        sexo: selectedOption.sexo,
        pnf: selectedOption.pnf,
        trayecto: selectedOption.trayecto,
      };
      console.log(info);
      setSelectedBorrowers([...selectedBorrowers, info]);
    };
    const columns = [
      { field: 'titulo', headerName: 'Título', width: 420 },
      { field: 'codigo_ejemplar', headerName: 'Ejemplar', width: 220 },
      { field: 'estado', headerName: 'Estado', width: 180 },
  
      {
        field: 'ver',
        headerName: 'Ver',
        width: 180,
        renderCell: (params) => (
          <button className='btn btn-danger' onClick={() => handleDiscard(params.row.id_ejemplar)}>
            Descartar
          </button>
        ),
      },
    ];
  
    const handleDiscard = (id_ejemplar) => {
      const updatedDataArray = selectedDataArray.filter((item) => item.id_ejemplar !== id_ejemplar);
      setSelectedDataArray(updatedDataArray);
    };
    const handleBorrow = () => {
      if (selectedDataArray.length > 0 && selectedBorrower) {
        // Realiza la lógica de préstamo aquí
        // Verificar disponibilidad, registrar el préstamo, etc.
        // Manejar errores y éxitos
      } else {
        console.error('Debe seleccionar al menos un ejemplar y un solicitante.');
      }
    };
  
    const processedSelectedDataArray = selectedDataArray.map((item, index) => ({
      ...item,
      id: `ejemplar_${item.id_ejemplar}_${index}`,
    }));
  
    const handleRemoveBorrower = (id_solicitante) => {
      const updatedSelectedBorrowers = selectedBorrowers.filter((borrower) => borrower.value !== id_solicitante);
      setSelectedBorrowers(updatedSelectedBorrowers);
    };
  
    const sendRequest = async () => {
      if (selectedDataArray.length > 0 && selectedBorrowers.length > 0) {
        try {
          const selectedBorrowerIds = selectedBorrowers.map((borrower) => borrower.id_solicitante);
          
          
          const response = await axios.post(`${apiKey}/api/borrow-project/createBorrowProject`, {
            id_ejemplar: selectedDataArray,
            id_solicitante: Number(selectedBorrowerIds),  
          });
   
          if(response.data){
            Swal.fire({
              icon: 'success',
              title: "Correcto",
              text: "Prestamo realizado correctamente"
            });
            setSelectedBorrowers([])
            setSelectedDataArray([])
          }
        } catch (error) {
          Swal.fire('Error', 'Hubo un error al registrar la solicitud', 'error');
          console.error('Error al registrar la solicitud:', error);
        }
      } else {
        console.error(error)
        Swal.fire('Error', 'Debe seleccionar al menos un ejemplar y un solicitante', 'error');
      }
    };
  return (
    <Layout>
      <h2 className='m-3 p-3'>Prestar Proyecto</h2>
      <div className='row m-3 p-3'>
       
        <div className='col-5'>
  <label className='form-label mt-3'>Seleccionar Proyecto:</label>
  <Select
    value={selectedBookOption}
    onChange={handleBookChange}
    options={books.map((book) => ({
      value: book.id_proyecto,
      label: book.titulo,
    }))}
    placeholder='Seleccionar un proyecto'
  />
</div>
        {selectedBookOption && (
          <div className='col-7'>
            <label className='form-label mt-3'>Seleccionar Ejemplar: </label>
            <div>
              <select className='form-control' value={selectedCopy} onChange={handleCopyChange}>
                <option value=''>Seleccionar un ejemplar</option>
                {copies.map((copy) => (
                  <option key={copy.id_ejemplar_proyecto} value={copy.id_ejemplar_proyecto}>
                    Ejemplar {copy.titulo} {copy.codigo_ejemplar}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
      <h3 className='m-3 p-3'>Ejemplares</h3>
      <div className='m-3 p-3' style={{ width: '96%' }}>
        <DataGrid
          rows={selectedDataArray}
          columns={columns}
          pagination
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]} // Opciones de tamaño de página
          disableSelectionOnClick // Deshabilitar selección al hacer clic
          getRowId={(row) => row.id_ejemplar_proyecto}
        />
      </div>
      <h2 className='m-3 p-3'>Solicitante</h2>
      <div className='row m-3 p-3'>
  <div className='col-5'>
    <Select
      value={selectBorrowerOption}
      onChange={handleBorrowerChange}
      options={borrower.map((borrower) => ({
        value: borrower.id_solicitante,
    cedula: borrower.cedula, // Asegúrate de que estas propiedades estén definidas
    nombre: borrower.nombre, // Asegúrate de que estas propiedades estén definidas
    apellido: borrower.apellido, // Asegúrate de que estas propiedades estén definidas
    genero: borrower.sexo, // Asegúrate de que estas propiedades estén definidas
    pnf: borrower.pnf, // Asegúrate de que estas propiedades estén definidas
    trayecto: borrower.trayecto, // Asegúrate de que estas propiedades estén definidas
    label: `${borrower.cedula} ${borrower.nombre} ${borrower.apellido}`,
      }))}
      placeholder='Seleccionar un solicitante'
    />
  </div>
 
  <div className='col-7'>
     
    <div style={{ width: '99%' }}>
      <DataGrid
        rows={selectedBorrowers}
        columns={[
   
          { id: 'nombre', field: 'nombre', headerName: 'Nombre', width: 120 },
          { id: 'apellido', field: 'apellido', headerName: 'Apellido', width: 120 }, 
          { id: 'pnf', field: 'pnf', headerName: 'PNF', width: 120 },
          { id: 'trayecto', field: 'trayecto', headerName: 'Trayecto', width: 110 },
          {
            field: 'eliminar',
            headerName: 'Eliminar',
            width: 60,
            renderCell: (params) => (
              <button className='btn btn-danger' onClick={() => handleRemoveBorrower(params.row.value)}>
                X
              </button>
            ),
          },
        ]}
        pageSize={12} // Puedes ajustar el tamaño de página según tus necesidades
        rowsPerPageOptions={[5, 10, 20]} // Opciones de tamaño de página
        disableSelectionOnClick
        getRowId={(row) => row.id_solicitante} // Utiliza la propiedad 'id_solicitante' como identificador único
      />
    </div>
  </div>
</div>
             
      <div className='m-3 p-3 '>
      <button className='btn btn-primary' onClick={sendRequest}>Aceptar</button>

      </div>
     
    </Layout>
  )
}

export default BorrowProject