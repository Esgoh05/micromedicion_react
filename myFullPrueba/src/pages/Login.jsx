import gotaWelcomeImage from "../assets/imgs/gota_welcome1.png";
import { useState } from "react"


const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    //desestructurar formData
    const {email, password} = formData

    //definir funcion onChange. Actualiza el estado
    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
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