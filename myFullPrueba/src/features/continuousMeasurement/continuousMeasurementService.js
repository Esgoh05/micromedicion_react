import axios from 'axios'

//const API_URL = 'https://helpful-blue-snapper.cyclic.app/api/v1/usuarios/'
const API_URL = 'http://127.0.0.1:5001/api/v1/medicionContinua/'

const getContinuousMeasurement = async() => {

    const response = await axios.get(API_URL+'obtenerMediciones')

    //console.log(response.data)

    return response.data
}

const filterMeasurement = async(information) => {
    //console.log(information)


    const response = await axios.post(API_URL+'filtrarMedicion', information)

    //console.log(response.data)

    return response.data
}

const filterMonthMeasurement = async(information) => {
    //console.log(information)


    const response = await axios.post(API_URL+'filtraMedicionMes', information)

    //console.log(response.data)

    return response.data
}

const filterDateMeasurement = async(information) => {
    console.log(information)


    const response = await axios.post(API_URL+'filtraMedicionPeriodo', information)

    console.log(response.data)

    return response.data
}

const continuousMeasurementService = {
    getContinuousMeasurement,
    filterMeasurement,
    filterMonthMeasurement,
    filterDateMeasurement
}

export default continuousMeasurementService