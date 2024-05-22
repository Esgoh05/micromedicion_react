import gotaWelcomeImage from "../assets/imgs/gota_welcome.png"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { useState, useEffect } from "react"
import { reset, register, getUsers } from '../features/auth/authSlice'
import { closeModal } from '../features/modal/modalSlice'
import Spinner from "../components/Spinner"


const Modal = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    phone: '',
  })

  //desestructurar formData
  const {name, email, password, phone} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch();

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

      const userData = {
        name, email, password, phone
      }

      console.log("datos usuarios")
      //dispatch(register(userData))
      //---dispatch(closeModal())
      //dispatch(getUsers())
      dispatch(register(userData))
      .then(() => {
        dispatch(closeModal());
        dispatch(getUsers());
      });
   }

   useEffect(() => {
        if(isError){
            dispatch(closeModal())
            console.log("cerro modal")
            toast.error(message)
        }

        if(isSuccess){
            //dispatch(closeModal())
            console.log("cerro modal is success")
            navigate('/usuarios')
        }

        dispatch(reset())
        
   }, [user, isError, isSuccess, message, navigate, dispatch])


   if(isLoading){
    return <Spinner />
   }


  return (
    <>
        <section className='modal-container'>
        <div className='modal'>
            <section className='modal-header'>
                <h5>Agregar un usuario</h5>
                <button onClick={() => { dispatch(closeModal()) }}> {/*onClick={() => { dispatch(closeModal()) }} */}
                    <span aria-hidden="true">&times;</span>
                </button>
            </section>
            <section className='modal-body'>
            <div className="form-group">
                <img src={gotaWelcomeImage} alt="Mascota saludo" className="pngGotaWelcome"/>
                <label htmlFor="name">Nombre:</label>
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
                <label htmlFor="phone">Teléfono:</label>
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
                <label htmlFor="email">Correo electrónico:</label>
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
                <label htmlFor="password">Contraseña:</label>
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
        </section>
            <section className='modal-footer'>
                <form onSubmit={onSubmit}>
                <button type='submit' className='btn btn-primary'> 
                    Registrar
                </button>
                </form>
                <button type='button' className='btn btn-danger' onClick={() => { dispatch(closeModal()) }} >
                    Cerrar
                </button>
            </section>
        </div>
        </section>
        
    </>
  );
};
export default Modal;