import { useState, useEffect } from "react"

const Register = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  //desestructurar formData
  const {name, email, password, password2} = formData

  //definir funcion onChange. Actualiza el estado

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <>
      <section className="heading">
        <h4>Registrar Usuario</h4>
        <p>Por favor crea un Usuario</p>

      </section>
      <section className="form">
        <form>
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
        </form>
      </section>
    </>
  )
}

export default Register