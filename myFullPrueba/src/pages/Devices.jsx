import { FaPlus, FaRegTrashAlt, FaCircle } from 'react-icons/fa';
import { HiMiniCpuChip } from 'react-icons/hi2'
import { BsFillHouseCheckFill } from 'react-icons/bs'
import { MdEdit } from 'react-icons/md'
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { openModal } from '../features/modal/modalSlice';
import Modal from '../pages/RegisterDevices'
import { getDevices, reset } from '../features/device/deviceSlice'
import { useLocation } from 'react-router-dom'

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'; 

const Devices = () => {
    const { pathname } = useLocation();
    const {isOpen} = useSelector((store) => store.modal)
    const { devices } = useSelector((store) => store.device);
    const [globalFilter, setGlobalFilter] = useState(null); // Agrega el estado para el filtro global
    const [rowsPerPage] = useState(10);
    const dispatch = useDispatch();
  
    const editButton = (rowData) => {
      return (
        <Button onClick={() => handleEdit(rowData)} className="btn-primary">
          <MdEdit />
          Editar
        </Button>
      );
    };
  
    const deleteButton = (rowData) => {
      return (
        <Button onClick={() => handleDelete(rowData)} className="btn-danger">
          <FaRegTrashAlt />
          Eliminar
        </Button>
      );
    };
    
  // Llama a la acción para obtener la lista de usuarios al cargar el componente
  useEffect(() => {
    
    
    if(!isOpen){
        console.log(isOpen)
        dispatch(getDevices())
    }else{
        dispatch(reset())
    }

  }, [dispatch, pathname, isOpen]);

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
        Mostrando desde {devices?.length > 0 ? 1 : 0} a {devices?.length} de {devices?.length} dispositivos
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
                <HiMiniCpuChip className='card-icon-header'/>
                Dispositivos
              </h2>
              <button type="button" className="btn btn-primary float-right" data-toggle="modal" onClick={() => dispatch(openModal())}>
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
            <div className='table-responsive'>
                <DataTable value={devices} dataKey="id" paginator rows={rowsPerPage}  
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                            globalFilter={globalFilter}
                            header={header} 
                            footer={currentPageReport}
                            className="p-datatable-custom">
                    <Column field="macAddress" header="Dirección Mac" style={{ width: '25%' }} headerStyle={{ textAlign: 'center' }}></Column>
                    <Column field="sensorModel" header="Modelo del sensor" style={{ width: '20%' }} headerStyle={{ textAlign: 'center' }}></Column>
                    <Column field="kFactor" header="Factor K" style={{ width: '25%' }} headerClassName="header-column"></Column>
                    <Column field="deviceStatus" header="Estado del dispositivo" 
                        body={(rowData) => (
                            <span>{rowData.deviceStatus == 1 ? (
                                    <>
                                    Activo <FaCircle className='activeIndicator'/>
                                    </>
                                ) 
                                : (
                                    <>
                                        Instalado <BsFillHouseCheckFill  className='houseCheck'/>
                                    </>
                            )}
                            </span>
                            )} 
                        style={{ width: '20%' }} headerClassName="header-column"></Column>
                    <Column header="Editar" body={editButton} style={{ width: '25%' }} headerClassName="header-column"></Column>
                    <Column header="Eliminar" body={deleteButton} style={{ width: '25%' }} headerClassName="header-column"></Column>
                </DataTable>
            </div>
          </div>
        </div>
      </section>
      {isOpen && <Modal/>}
  </>
  )
}

export default Devices