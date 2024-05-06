import { FaUsers, FaPlus } from 'react-icons/fa';
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
//import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {

  const navigate = useNavigate()

  const {user} = useSelector((state) => (state.auth))

  useEffect(() => {
    if(!user){
      navigate('/login')
    }
  }, [user, navigate])

  return (
    <>
      <section className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header vstack gap-3">
              <h2 className="card-title">
                <FaUsers className='card-icon-header'/>
                Usuarios
              </h2>
              <button type="button" className="btn btn-primary float-right" data-toggle="modal" data-target="#exampleModal">
                <FaPlus className='card-icon'/>
                Agregar nuevo usuario
              </button>
            </div>  
          </div>
        </div>
      </section>
      <section className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header vstack gap-3">
              <h2 className="card-title">
                Usuarios registrados
              </h2>
            </div>  
          </div>
        </div>
      </section>
    </>
  )
}

export default Dashboard