const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
import React, { useState } from 'react';
import jsPDF from 'jspdf';
import axios from 'axios';
import  'jspdf-autotable';

const ReporteProyectos = () => {
  const [selectedOption, setSelectedOption] = useState('getBorrowBookDateRange');
  const [reportData, setReportData] = useState(null);

  const handleGenerateReport = async () => {
    try {
      const response = await axios.get(`${apiKey}/api/borrow-project/getBorrowBooksByDateParam/${selectedOption}`);
      const data = response.data;
        console.log(data)
      // Crear un nuevo documento PDF
      const pdf = new jsPDF();
      pdf.text('Reporte de Prestamos de Proyectos', 10, 10);
  
      // Definir la posición inicial de la tabla
      let y = 30;
  
      // Crear un array de encabezados de tabla
      const headers = [
        '#',
        'Fecha',
        'Devolución',
        'Solicitante', 
        'Cédula', 
        'Ocupación', 
        'Ejemplar',
        'Proyecto'
      ];
  
      // Define el ancho de las columnas (puedes ajustar los valores según tus necesidades)
      const columnWidth = [5, 20, 22, 40, 20, 28, 20, 40 ];
  
      // Opciones de estilo
      const styles = {
        halign: 'center',  // Alineación horizontal en el centro
        valign: 'middle',  // Alineación vertical en el medio
        fontSize: 9,
      };
      // Crear un array de datos
const rows = data.map((item) => [
    item.id_prestamo_proyecto,
    item.fecha_prestamo ? new Date(item.fecha_prestamo).toLocaleDateString() : '',
    item.fecha_devolucion === '0000-00-00 00:00:00' ? 'Sin regresar' : new Date(item.fecha_devolucion).toLocaleDateString(),
    item.nombre + " " + item.apellido, 
    item.cedula , 
    item.ocupacion , 
    item.codigo_ejemplar_proyecto,
    item.titulo
  ]);

      // Crear la tabla
      pdf.autoTable({
        startY: y,
        head: [headers],
        body: rows,
        headStyles: styles,
        bodyStyles: styles,
        columnStyles: {
          0: { cellWidth: columnWidth[0] },
          1: { cellWidth: columnWidth[1] },
          2: { cellWidth: columnWidth[2] },
          3: { cellWidth: columnWidth[3] },
          4: { cellWidth: columnWidth[4] },
          5: { cellWidth: columnWidth[5] },
          6: { cellWidth: columnWidth[6] },
          7: { cellWidth: columnWidth[7] },
          8: { cellWidth: columnWidth[8] },
          9: { cellWidth: columnWidth[9] },
          10: { cellWidth: columnWidth[10] },
        },
      });
  
      // Guardar el PDF
      pdf.save('reporte.pdf');
    } catch (error) {
      console.error('Error al generar el informe:', error);
    }
  };
  

  return (
    <div > 
      <label htmlFor="reportOptions">Seleccione una opción de reporte:</label>
      <div className="d-flex">
         <select
        id="reportOptions"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        className=''
      >
        <option value="none">Seleccionar</option>
          <option value="today">Hoy</option>
        <option value="yesterday">Ayer</option>
        <option value="week">Esta Semana</option>
        <option value="month">Este Mes</option>
        <option value="year">Este Año</option>
      </select>
      <button className='btn btn-success' onClick={handleGenerateReport}>Generar Reporte en PDF</button>
      </div>
     
    </div>
  );
};

export default ReporteProyectos;
