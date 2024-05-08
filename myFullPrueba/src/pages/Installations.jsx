import { FaPlus } from 'react-icons/fa';
import { BsHouseGear } from 'react-icons/bs'

const Installations = () => {
  return (
    <>
        <section className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header vstack gap-3">
              <h2 className="card-title">
                <BsHouseGear className='card-icon-header'/>
                Instalaciones
              </h2>
              <button type="button" className="btn btn-primary float-right" data-toggle="modal" data-target="#exampleModal">
                <FaPlus className='card-icon'/>
                Agregar nueva instalacion
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
                Instalaciones registradas
              </h2>
            </div>  
          </div>
        </div>
      </section>
    </>
  )
}

export default Installations