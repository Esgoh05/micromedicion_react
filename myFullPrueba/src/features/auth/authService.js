import axios from 'axios'

//const API_URL = 'https://helpful-blue-snapper.cyclic.app/api/v1/usuarios/'
const API_URL = 'http://127.0.0.1:5001/api/v1/usuarios/'

//Se crea peticion para crear un usuario
const register = async(userData) => {
    const response = await axios.post(API_URL+'crearUsuario', userData)

    return response.data
}

//Se crea peticion para logear un usuario
const login = async(userData) => {
    const response = await axios.post(API_URL+'inicioSesion', userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Logout
const logout = async() => {
    localStorage.removeItem('user')
}


//Se crea peticion para obtener todos los datos de los usuarios
const getUsers = async() => {
    const userData = JSON.parse(localStorage.getItem('user'))
    //console.log(`respondio: ${userData}`)
    const token = userData.token
    //console.log(`el token es: ${token}`)

    !token ? console.log(`No hay token`) : console.log(`Token existe`)

    const response = await axios.get(API_URL+'obtenerDatosUsuario', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data

}

const authService = {
    register,
    login,
    logout,
    getUsers
}

export default authService