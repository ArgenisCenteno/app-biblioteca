const apiKey = import.meta.env.VITE_REACT_APP_API_KEY; 
import React,{useState} from 'react'
import axios from "axios"
import  logo  from '../img/logo.jpg'
import { useAuth } from '../context/auth';
import { useNavigate, useLocation, Link } from "react-router-dom";
import Swal from 'sweetalert2'



const RecuperarClave = () => {
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();


  const handleSubmit = async (e) => {
    e.preventDefault();
 
    // Enviar solicitud al backend para cambiar la contraseña con el token correspondiente
    try {
      const res = await axios.post(`${apiKey}/api/users/reset-password`, {email});

      if (res && res.data.success) {
       Swal.fire({
          title: 'Email Enviado',
          text: 'Por favor, revise su correo electronico',
          icon: 'success',
          showCancelButton: true, 
          cancelButtonColor: '#d33', 
          cancelButtonText: 'Cancelar',
        });
      } else {
        Swal.fire({
          title: 'Error al intentar enviar el email',
          text: 'Por favor, asegurese de escribir bien su correo',
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
              
                <h3 className="mb-5 text-center">  <strong>Recuperar clave</strong>  <br/>  
                </h3>
                <form onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                  <label className="form-label text-muted" htmlFor="typeEmailX-2">Email</label>
                  <input type="email" id="typeEmailX-2" placeholder='Ingresar email'  autoFocus
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} className="form-control form-control-lg" />
                  
                </div>
                {emailError && (
                      <small className="text-danger">{emailError}</small>
                    )}
                
                 
                <button className="btn btn-success btn-lg btn-block" type="submit">Enviar email</button>

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

export default RecuperarClave