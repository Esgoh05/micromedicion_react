
import { useSelector, useDispatch } from 'react-redux'
//import { useNavigate } from "react-router-dom"
//import { toast } from 'react-toastify'
import { useState, useEffect } from "react"
import { getDevices } from '../features/device/deviceSlice'
import { getUsers } from '../features/auth/authSlice'
import { getInstallations } from '../features/installation/installationSlice'
import { closeModal } from '../features/modal/modalSlice'
import { filterMeasurements, filterMonthMeasurement, filterDateMeasurement } from '../features/continuousMeasurement/continuousMeasurementSlice'
//import Spinner from "../components/Spinner"
import Select from 'react-select'
import makeAnimated from 'react-select/animated'; 

const FilterInformation = () => {
    const animatedComponents = makeAnimated();
    const { users } = useSelector((store) => store.auth);
    const { installations } = useSelector((store) => store.installation);
    const [selectedUser, setSelectedUser] = useState(null);
    const [deviceOptions, setDeviceOptions] = useState([]);
    const [selectedDevices, setSelectedDevices] = useState([]);
    const [inputMonth, setInputMonth] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const dispatch = useDispatch();

    const allEmails = users.map(user => ({
        value: user.email,
        label: user.email
    }));

    // Función para manejar el cambio en el Select
    const handleSelectChangeEmail = (selectedOption) => {
        setSelectedUser(selectedOption); // Actualizar el estado con el usuario seleccionado
        setFormData(prevState => ({
            ...prevState,
            email: selectedOption.value // Actualizar el campo de email con el valor seleccionado
        }));
        //console.log(selectedOption.value);
    
        // Filtrar el usuario basado en el correo electrónico seleccionado y obtener el _id
        const userId = users.find(user => user.email === selectedOption.value)?._id;
        //console.log(userId);
    
        if (userId) {
            // Encontrar todos los dispositivos asociados al userId
            const userInstallations = installations.filter(installation => installation.userId === userId);
            const deviceOptions = userInstallations.map(installation => ({
                value: installation.deviceId,
                label: installation.deviceId // Puedes reemplazar con el nombre del dispositivo si está disponible
            }));
            //console.log(deviceOptions);
            
            // Actualizar el estado con los dispositivos encontrados
            setDeviceOptions(deviceOptions);
            setSelectedDevices([]); // Limpiar las selecciones previas
        } else {
            console.log('No se encontró el userId');
            setSelectedDevices([]);
        }
    };

    const handleSelectChangeDevices = (selectedOptions) => {
        setSelectedDevices(selectedOptions);
    };


    // Función para manejar el cambio en el Select de dispositivos

    const handleChange = (e) => {
        setInputMonth(e.target.value);
    };

    const handleChangeStartDate = (e) => {
        const newStartDate = new Date(e.target.value);
        setStartDate(e.target.value);
    
        const nextDay = new Date(newStartDate);
        nextDay.setDate(newStartDate.getDate() + 1);
        
        if (endDate && new Date(endDate) < nextDay) {
            setEndDate('');
        }
    };
    

    const handleChangeEndDate = (e) => {
        setEndDate(e.target.value);
    };

    const [formData, setFormData] = useState({
        email: '',
        deviceId: ''
    })

    //desestructurar formData
    const { email } = formData 

    const onSubmit = (e) => {
        e.preventDefault()

        const information = {
            email,
            deviceId: selectedDevices.map(device => device.value) // Asegurar que deviceId esté actualizado
        }

        //console.log("datos usuarios")
        //console.log(email)
        //console.log(selectedDevices.map(device => device.value))
        //console.log(information)
        dispatch(filterMeasurements(information))
        .then(() => {
            dispatch(closeModal());
            //dispatch(getContinuousMeasurement())
        });
    }

    const onSubmitMonth = (e) => {
        e.preventDefault()

        const information = {
            month: inputMonth
        }

        //console.log("Month " + JSON.stringify(information))
        dispatch(filterMonthMeasurement(information))
        .then(() => {
            dispatch(closeModal());
        });

    }

    const onSubmitDate = (e) => {
        e.preventDefault();

        const information = {
            startDate,
            endDate
        };

        console.log(startDate)
        console.log(endDate)
        dispatch(filterDateMeasurement(information))
        .then(() => {
            dispatch(closeModal());
        });
    };

    useEffect(() => {
        dispatch(getUsers());
        dispatch(getDevices());
        dispatch(getInstallations());
    }, [dispatch]);

    // Personalizar el ClearIndicator para que no se muestre
    const customComponents = {
        ...animatedComponents,
        ClearIndicator: () => null
    };

    const customStyles = {
        control: (provided) => ({
            ...provided,
            borderRadius: '30px',
            margin: '5%'
        }),
        multiValue: (provided) => ({
            ...provided,
            display: 'inline-flex',
            maxWidth: '100px', // Limitar el ancho de los elementos seleccionados
            overflow: 'hidden', // Ocultar el texto desbordado
            textOverflow: 'ellipsis' // Añadir puntos suspensivos
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            whiteSpace: 'nowrap',
        }),
        valueContainer: (provided) => ({
            ...provided,
            flexWrap: 'nowrap', // Evitar que los elementos seleccionados se envuelvan
            overflowX: 'auto' // Habilitar desplazamiento horizontal
            
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#a9a9a9' // Color del placeholder
        })
    };



  return (
    <>
        <section className='modal-filter-container'>
            <div className='modal-filter'>
                <section className='modal-filter-header'>
                    <h5>Filtrar por:</h5>
                    <button onClick={() => { dispatch(closeModal()) }}> 
                        <span aria-hidden="true">&times;</span>
                    </button>
                </section>
                <section className='modal-filter-body'>
                    <section>
                        <h5>Dispositivo.</h5>
                        <Select
                            className='select-email'
                            styles={{
                                control: (provided) => ({
                                    ...provided,
                                    borderRadius: '30px',
                                    margin: '5%'
                                })
                            }}
                            options={allEmails} // Usar las opciones transformadas
                            value={selectedUser} // Usar el usuario seleccionado
                            onChange={handleSelectChangeEmail} 
                            name='email'
                            placeholder="Selecciona un correo electrónico"
                        />
                        <Select
                            closeMenuOnSelect={true} 
                            //components={animatedComponents}
                            components={customComponents}
                            isDisabled={!selectedUser} // Deshabilitar si no se ha seleccionado un usuario
                            isMulti
                            styles={customStyles}
                            options={deviceOptions}
                            value={selectedDevices}
                            onChange={handleSelectChangeDevices} // Manejar cambios en la selección de dispositivos
                            name='deviceId'
                            //placeholder="Selecciona al menos un dispositivo"
                            noOptionsMessage={() => "No hay opciones disponibles"}
                        />
                        <form onSubmit={onSubmit}>
                            <button className='btn-primary btn-lg'  disabled={selectedDevices.length === 0 || !selectedUser}>Graficar</button>
                        </form>
                
                    </section>
                    
                    <hr className='hr'/>

                    <section>
                        <h5>Mes.</h5>
                        <div className='vstack form-group'>
                            <input 
                                type="Month" 
                                className='inputMonth'
                                name="inputMonth" 
                                value={ inputMonth }
                                onChange={ handleChange }
                            />
                        </div>
                        <div>
                            <form onSubmit={ onSubmitMonth }>
                                <button className='btn-primary btn-lg' disabled={!inputMonth}>Graficar</button>
                            </form>
                        </div>
                    </section>

                    <hr className='hr'/>

                    <section>
                        <h5>Periodo.</h5>
                        <div className='vstack form-group'>
                            <div className='hstack'>
                                <input 
                                    type="Date"
                                    className='inputDate' 
                                    value={startDate}
                                    onChange={handleChangeStartDate}
                                />

                                <input 
                                    type="Date"
                                    className='inputDate' 
                                    value={endDate}
                                    min={startDate ? new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 1)).toISOString().split('T')[0] : ''}
                                    onChange={handleChangeEndDate}
                                />
                            </div>
                        </div>
                        <div>
                            <form onSubmit={ onSubmitDate }>
                                <button className='btn-primary btn-lg' disabled={!startDate || !endDate}>Graficar</button>
                            </form>
                        </div>
                    </section>
                
                </section>
            </div>
        </section>
    </>
  )
}

export default FilterInformation