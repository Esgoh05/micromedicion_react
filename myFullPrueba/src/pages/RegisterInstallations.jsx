import Select from 'react-select'
import gotaWelcomeImage from "../assets/imgs/gota_welcome.png"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { useState, useEffect } from "react"
import { reset, registerInstallation, getInstallations } from '../features/installation/installationSlice'
import { getUsers } from '../features/auth/authSlice'
import { getDevices } from '../features/device/deviceSlice'
import { closeModal } from '../features/modal/modalSlice'
import Spinner from "../components/Spinner"

const RegisterInstallations = () => {
    //console.log(getUsers)
    const { users } = useSelector((store) => store.auth);
    const { devices } = useSelector((store) => store.device);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedDevice, setSelectedDevice] = useState(null);
    //console.log(JSON.stringify(useSelector((store) => store.auth)) + ' users')


    const allEmails = users.map(user => ({
        value: user.email,
        label: user.email
    }));

    /*const allSensorModels = devices.map(device => ({
        value: device.sensorModel,
        label: device.sensorModel,
        deviceId: device._id
    }));*/
    const allSensorModels = devices
    .filter(device => device.deviceStatus === 1) // Filtrar dispositivos con estado 1
    .map(device => ({
        value: device.sensorModel,
        label: device.sensorModel,
        deviceId: device._id
    }));


    //console.log(options)

    const [formData, setFormData] = useState({
        email: '',
        deviceId: '',
        pipeDiameter: '',
        ssid: '',
        passwordSsid: ''
    })

    //desestructurar formData
    const {email, deviceId, pipeDiameter, ssid, passwordSsid } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const {installation, isLoading, isError, isSuccess, message} = useSelector((state) => state.installation)

    //definir funcion onChange. Actualiza el estado
    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value
        }))
    }

    // Función para manejar el cambio en el Select
    const handleSelectChangeEmail = (selectedOption) => {
        setSelectedUser(selectedOption); // Actualizar el estado con el usuario seleccionado
        setFormData(prevState => ({
            ...prevState,
            email: selectedOption.value // Actualizar el campo de email con el valor seleccionado
        }));
    };

    // Función para manejar el cambio en el Select
    const handleSelectChangeModel = (selectedOption) => {
        setSelectedDevice(selectedOption); // Actualizar el estado con el usuario seleccionado
        setFormData(prevState => ({
            ...prevState,
            deviceId: selectedOption.value // Actualizar el campo de email con el valor seleccionado
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault()
    
        const installationData = {
            email, deviceId, pipeDiameter, ssid, passwordSsid
        }
    
        console.log("datos dispositivos")
        dispatch(registerInstallation(installationData))
        .then(() => {
            dispatch(closeModal());
            dispatch(getInstallations());
        });
    }
    
    useEffect(() => {
        if(isError){
            dispatch(closeModal())
            console.log("cerro modal")
            toast.error(message)
        }

        if(isSuccess){
            console.log("cerro modal is success")
            navigate('/instalaciones')
        }

        dispatch(reset())
        
    }, [installation, isError, isSuccess, message, navigate, dispatch])

    useEffect(() => {
        dispatch(getUsers());
        dispatch(getDevices());
    }, [dispatch]);
    
    
       if(isLoading){
        return <Spinner />
       }
    
  return (
        <>
        <section className='modal-container'>
        <div className='modal'>
            <section className='modal-header'>
                <h5>Agrega instalación</h5>
                <button onClick={() => { dispatch(closeModal()) }}> 
                    <span aria-hidden="true">&times;</span>
                </button>
            </section>
            <section className='modal-body'>
            <div className="form-group">
                <img src={gotaWelcomeImage} alt="Mascota saludo" className="pngGotaWelcome"/>
                <label htmlFor="email">Correo electrónico:</label>
                <Select
                    className='select-email'
                    styles={{
                        control: (provided) => ({
                            ...provided,
                            borderRadius: '30px'
                        })
                    }}
                    options={allEmails} // Usar las opciones transformadas
                    value={selectedUser} // Usar el usuario seleccionado
                    onChange={handleSelectChangeEmail} 
                />
            </div>
            <div className="form-group">
                <label htmlFor="deviceId">Id - Modelo del sensor:</label>
                <Select
                    styles={{
                        control: (provided) => ({
                            ...provided,
                            borderRadius: '30px'
                        })
                    }}
                    options={allSensorModels} // Usar las opciones transformadas
                    getOptionLabel={(option) => `${option.deviceId} => ${option.label}`} // Utiliza solo la propiedad label para la etiqueta
                    getOptionValue={(option) => option.value} 
                    value={selectedDevice} // Usar el usuario seleccionado
                    name='deviceId'
                    onChange={handleSelectChangeModel} 
                />
            </div>
            <div className="form-group">
                <label htmlFor="pipeDiameter">Diámetro de tuberia:</label>
                <input 
                type="text" 
                className="form-control"
                id="pipeDiameter"
                name="pipeDiameter"
                value={pipeDiameter}
                placeholder="Por favor introduce factor K"
                onChange={onChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="ssid">SSID:</label>
                <input 
                type="text" 
                className="form-control"
                id="ssid"
                name="ssid"
                value={ssid}
                placeholder="Por favor introduce factor K"
                onChange={onChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="passwordSsid">Contraseña SSID:</label>
                <input 
                type="password" 
                className="form-control"
                id="passwordSsid"
                name="passwordSsid"
                value={passwordSsid}
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

export default RegisterInstallations