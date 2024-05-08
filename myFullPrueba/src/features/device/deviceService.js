import axios from 'axios'

//const API_URL = 'https://helpful-blue-snapper.cyclic.app/api/v1/usuarios/'
const API_URL = 'http://127.0.0.1:5001/api/v1/dispositivos/'


const registerDevice = async(deviceData) => {
    const userData = JSON.parse(localStorage.getItem('user'))
    console.log(`respondio: ${userData}`)
    const token = userData.token
    console.log(`el token es: ${token}`)

    !token ? console.log(`No hay token`) : console.log(`Token existe`)

    const response = await axios.post(API_URL+'altaDispositivos', deviceData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data
}

const getDevices = async() => {
    const userData = JSON.parse(localStorage.getItem('user'))
    console.log(`respondio: ${userData}`)
    const token = userData.token
    console.log(`el token es: ${token}`)

    !token ? console.log(`No hay token`) : console.log(`Token existe`)

    const response = await axios.get(API_URL+'obtenerInfo', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data
}

const deviceService = {
    registerDevice,
    getDevices
}

export default deviceService