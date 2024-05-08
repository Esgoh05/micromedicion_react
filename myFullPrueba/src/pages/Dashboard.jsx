import { FaPlus } from 'react-icons/fa';
import { BsClipboard2Data } from 'react-icons/bs'
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { InputText } from 'primereact/inputtext';

//import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {

  const navigate = useNavigate()

  const {user} = useSelector((state) => (state.auth))

  useEffect(() => {
    if(!user){
      navigate('/login')
    }
  }, [user, navigate])

  const header = (
    <div className="search-user-container hstack align-center">
      <p className="m-0">Buscar:</p>
      <div className="search-input-container">
        <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
      </div>
    </div>
  );

  const currentPageReport = (
    <div className="p-paginator p-datatable-footer">
      <span className="p-paginator-current">
        Mostrando desde {/*{users?.length > 0 ? 1 : 0} a {users?.length} de {users?.length}*/} usuarios
      </span>
    </div>
  );

  return (
    <>
      <section className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header vstack gap-3">
              <h2 className="card-title">
                <BsClipboard2Data className='card-icon-header'/>
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