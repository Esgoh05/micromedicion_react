
import gotaWelcomeImage from "../assets/imgs/gota_welcome.png"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { useState, useEffect } from "react"
import { reset, registerDevice, getDevices } from '../features/device/deviceSlice'
import { closeModal } from '../features/modal/modalSlice'
import Spinner from "../components/Spinner"

const RegisterDevices = () => {
    const [formData, setFormData] = useState({
        macAddress: '',
        sensorModel: '',
        kFactor: '',
    })

    //desestructurar formData
    const {macAddress, sensorModel, kFactor } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const {device, isLoading, isError, isSuccess, message} = useSelector((state) => state.device)

    //definir funcion onChange. Actualiza el estado
    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
    
          const deviceData = {
            macAddress, sensorModel, kFactor
          }
    
          console.log("datos dispositivos")
          //dispatch(register(userData))
          //---dispatch(closeModal())
          //dispatch(getUsers())
          dispatch(registerDevice(deviceData))
          .then(() => {
            dispatch(closeModal());
            dispatch(getDevices());
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
                navigate('/dispositivos')
            }
    
            dispatch(reset())
            
       }, [device, isError, isSuccess, message, navigate, dispatch])
    
    
       if(isLoading){
        return <Spinner />
       }
    
  return (
    <>
        <section className='modal-container'>
        <div className='modal'>
            <section className='modal-header'>
                <h5>Agrega dispositivo</h5>
                <button onClick={() => { dispatch(closeModal()) }}> {/*onClick={() => { dispatch(closeModal()) }} */}
                    <span aria-hidden="true">&times;</span>
                </button>
            </section>
            <section className='modal-body'>
            <div className="form-group">
                <img src={gotaWelcomeImage} alt="Mascota saludo" className="pngGotaWelcome"/>
                <label htmlFor="macAddress">Dirección Mac:</label>
                <input 
                type="text" 
                className="form-control"
                id="macAddress"
                name="macAddress"
                value={macAddress}
                placeholder="Por favor introduce direccion Mac"
                onChange={onChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="sensorModel">Modelo del sensor:</label>
                <input 
                type="text" 
                className="form-control"
                id="sensorModel"
                name="sensorModel"
                value={sensorModel}
                placeholder="Por favor introduce el modelo del sensor"
                onChange={onChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="kFactor">Factor K:</label>
                <input 
                type="kFactor" 
                className="form-control"
                id="kFactor"
                name="kFactor"
                value={kFactor}
                placeholder="Por favor introduce factor K"
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
  )
}

export default RegisterDevices