const apiKey = import.meta.env.VITE_REACT_APP_API_KEY; 
import React,{useState} from 'react'
import axios from "axios"
import  logo  from '../img/logo.jpg'
import { useAuth } from '../context/auth';
import { useNavigate, useLocation, Link, Form } from "react-router-dom";
import Swal from 'sweetalert2'
  import { useParams } from 'react-router-dom';


const CambiarClave = () => {
  const [auth, setAuth] = useAuth();
  const [cedula, setCedula] = useState(""); 
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({"cedula": "", "nuevaClave": ""})
  const navigate = useNavigate();  

  const handleChange = (event) => { 
    const { name, value } = event.target || event;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
 

    // Enviar solicitud al backend para cambiar la contraseña con el token correspondiente
    try {
        
 console.log(formData)
      const res = await axios.post(`${apiKey}/api/users/cambiar-clave `, formData);

      if (res && res.data.success) {
        Swal.fire({
          title: 'Contraseña Cambiada',
          text: 'La contraseña se cambió exitosamente',
          icon: 'success',
          showCancelButton: true,
          cancelButtonColor: '#d33',
          cancelButtonText: 'Cancelar',
        });
        // Redirigir a la página de inicio de sesión o cualquier otra página deseada
        navigate('/');
      } else {
        Swal.fire({
          title: 'Error al intentar cambiar la contraseña',
          text: 'Por favor, inténtelo nuevamente',
          icon: 'error',
          showCancelButton: true,
          cancelButtonColor: '#d33',
          cancelButtonText: 'Cancelar',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <section className='vh-100'  style={{ backgroundColor: '#508bfc' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5 ">
            <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 ">
              
                <h3 className="mb-5 text-center">  <strong>Cambiar clave</strong>  <br/>  
                </h3>
                <form onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
          <label className="form-label text-muted" htmlFor="typePassword">Nueva Clave</label>
          <input
            type="password"
            id="typePassword"
            placeholder="Ingrese su nueva clave" 
            name='nuevaClave'
            onChange={handleChange}
            className="form-control form-control-lg"
            required
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label text-muted" htmlFor="typePassword">Cedula</label>
          <input
            type="number"
            id="cedula"
            name='cedula'
            placeholder="Ingrese su cedula" 
            onChange={handleChange}
            className="form-control form-control-lg"
            required
          />
        </div>

        
                <button className="btn btn-success btn-lg btn-block" type="submit">Enviar  </button>

                </form>
                
                <hr className="my-4" />
                 
               <Link to={"/"}>
               <button className="btn btn-lg btn-block btn-primary mb-2" type="submit">
                  <i className="fab fa-facebook-f me-2"></i> Volver
                </button>
               </Link> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CambiarClave