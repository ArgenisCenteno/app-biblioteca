const apiKey = import.meta.env.VITE_REACT_APP_API_KEY; 
import React,{useState} from 'react'
import axios from "axios"
import  logo  from '../img/logo.jpg'
import { useAuth } from '../context/auth';
import { useNavigate, useLocation, Link } from "react-router-dom";




const Login = () => {
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();


  const handleSubtmit = async (e) =>{
    e.preventDefault(); 

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setEmailError("Ingrese un email válido");
      return;
    } else {
      setEmailError("");
    }

    try {
      const res = await axios.post(`${apiKey}/api/users/login`, {
        email,
        password,
      });
      if (res && res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/sistema/inicio");
      } else {
        setEmailError(res.data.message);
      }
    } catch (error) {
      console.log(error);
      setEmailError("Credenciales incorrectas");
    }
  }


  return (
    <section className='vh-100'  style={{ backgroundColor: '#508bfc' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5 ">
            <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 ">
              
                <h3 className="mb-5 text-center">  <strong>UPTNMLS</strong>  <br/>  
                </h3>
                <form onSubmit={handleSubtmit}>
                <div className="form-outline mb-4">
                  <label className="form-label text-muted" htmlFor="typeEmailX-2">Email</label>
                  <input type="email" id="typeEmailX-2" placeholder='Ingresar email'  autoFocus
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} className="form-control form-control-lg" />
                  
                </div>
                {emailError && (
                      <small className="text-danger">{emailError}</small>
                    )}
                <div className="form-outline mb-4">
                   <label className="form-label text-muted" htmlFor="typePasswordX-2">Clave</label>
                  <input type="password" id="typePasswordX-2" placeholder='Ingresar clave'  autoFocus
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} className="form-control form-control-lg" />
                 
                </div>
                 
                <button className="btn btn-primary btn-lg btn-block" type="submit">Ingresar al sistema</button>

                </form>
                
                <hr className="my-4" />
                 
               <Link to={"/recuperar-clave"}>
               <button className="btn btn-lg btn-block btn-danger mb-2" type="submit">
                  <i className="fab fa-facebook-f me-2"></i> Recuperar clave
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

export default Login