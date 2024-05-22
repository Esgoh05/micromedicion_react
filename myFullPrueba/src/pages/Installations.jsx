import { FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import { BsHouseGear } from 'react-icons/bs'
import { MdEdit } from 'react-icons/md'
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { openModal } from '../features/modal/modalSlice';
import Modal from '../pages/RegisterInstallations'
import { getInstallations, reset } from '../features/installation/installationSlice'
import { useLocation } from 'react-router-dom'

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'; 


const Installations = () => {
    const { pathname } = useLocation();
    const {isOpen} = useSelector((store) => store.modal)
    const { installations } = useSelector((store) => store.installation);
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
            console.log(isOpen + "....isopen")
            dispatch(getInstallations())
          }else{
            console.log(".reset")
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
            Mostrando desde {installations?.length > 0 ? 1 : 0} a {installations?.length} de {installations?.length} instalaciones
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
                <BsHouseGear className='card-icon-header'/>
                Instalaciones
              </h2>
              <button type="button" className="btn btn-primary float-right" data-toggle="modal" onClick={() => dispatch(openModal())}>
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
            <div className='table-responsive'>
                <DataTable value={installations} dataKey="id" paginator rows={rowsPerPage}  
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                            globalFilter={globalFilter}
                            header={header} 
                            footer={currentPageReport}
                            className="p-datatable-custom">
                    <Column field="userId" header="Usuario" style={{ width: '25%' }} headerStyle={{ textAlign: 'center' }}></Column>
                    <Column field="deviceId" header="Dispositivo" style={{ width: '25%' }} headerStyle={{ textAlign: 'center' }}></Column>
                    <Column field="pipeDiameter" header="Diámetro de tubería" style={{ width: '25%' }} headerStyle={{ textAlign: 'center' }}></Column>
                    <Column field="deviceLocation" header="Ubicación de dispositivo" style={{ width: '20%' }} headerStyle={{ textAlign: 'center' }}></Column>
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

export default Installations