import { FaMicrochip, FaPlus } from 'react-icons/fa';


const Devices = () => {
  return (
    <>
    <section className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header vstack gap-3">
              <h2 className="card-title">
                <FaMicrochip className='card-icon-header'/>
                Dispositivos
              </h2>
              <button type="button" className="btn btn-primary float-right" data-toggle="modal" data-target="#exampleModal">
                <FaPlus className='card-icon'/>
                Agregar nuevo dispositivo
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
                Dispositivos registrados
              </h2>
            </div>  
          </div>
        </div>
      </section>
  </>
  )
}

export default Devices