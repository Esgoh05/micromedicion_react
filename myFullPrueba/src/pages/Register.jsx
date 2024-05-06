import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {toast} from 'react-toastify'
import {reset, register} from '../features/auth/authSlice'
import Spinner from "../components/Spinner"

const Register = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    phone: '',
  })

  //desestructurar formData
  const {name, email, password, password2, phone} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

  //definir funcion onChange. Actualiza el estado

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if(password !== password2){
      toast.error('Las contrasenas no coinciden')
    }else{
      const userData = {
        name, email, password, phone
      }
      dispatch(register(userData))
    }
  }

  useEffect(() => {
    if(isError){
      toast.error(message)
    }

    if(isSuccess){
      navigate('/login')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  if(isLoading){
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h4>Registrar Usuario</h4>
        <p>Por favor crea un Usuario</p>

      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input 
              type="text" 
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Por favor escribe tu nombre"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input 
              type="email" 
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Por favor escribe tu email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Por favor escribe tu contraseña"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Por favor confirma tu password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input 
              type="tel" 
              className="form-control"
              id="phone"
              name="phone"
              value={phone}
              placeholder="Por favor escribe tu numero de telefono"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block">
              Crear
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register