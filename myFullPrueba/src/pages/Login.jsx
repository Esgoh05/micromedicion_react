import gotaWelcomeImage from "../assets/imgs/gota_welcome1.png";
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {toast} from 'react-toastify'
import {reset, login} from '../features/auth/authSlice'
//import Spinner from "../components/Spinner"


const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    //desestructurar formData
    const {email, password} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    useEffect(() => {
      if(isError){
        toast.error(message)
      }

      if(isSuccess || user){
        navigate('/dashboard')
      }

      dispatch(reset())

    }, [user, isLoading, isError, isSuccess, navigate, dispatch])

    //definir funcion onChange. Actualiza el estado
    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
          email,
          password
        }

        dispatch(login(userData))
    }
    
  return (
    <>
        <img src={gotaWelcomeImage} alt="Gota de bienvenida" className="imgWelcome"/>
        <section className="contenedor">
        <h2>Inicio de sesión</h2>
        <form id="loginForm" name="loginForm" onSubmit={onSubmit}>
          <div className="elemento">
            <label>Correo electrónico:</label>
            <input 
                type="email" 
                id="email"
                name="email"
                value={email}
                placeholder="Por favor escribe tu email"
                onChange={onChange}
                required
            />
          </div>

          <div className="elemento">
            <label>Contraseña:</label>
            <input 
                type="password" 
                id="password" 
                name="password" 
                value={password}
                onChange={onChange}
            />
          </div>

          <div className="elemento">
            <button type="submit" id="btnLogin">Iniciar sesion</button>
          </div>
          <div className="elemento">
            <p className="mb-1 text-sm mx-auto">
                <a href="{{ route('password.request') }}" id="olvidarPassword">¿Olvidaste tu contraseña?</a>
            </p>
          </div>
        </form>
        </section>
    </>
  )
}

export default Login