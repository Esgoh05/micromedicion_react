import { FaUsers, FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md'
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { openModal } from '../features/modal/modalSlice';
import Modal from '../pages/Modal'
import { getUsers, reset } from '../features/auth/authSlice'
import { useLocation } from 'react-router-dom'

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'; 

        
        
const Users = () => {
  const { pathname } = useLocation();
  const {isOpen} = useSelector((store) => store.modal)
  const { users } = useSelector((store) => store.auth);
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
    
    /*if (pathname === '/usuarios') {
        dispatch(getUsers());
      }*/

      if(!isOpen){
        console.log(isOpen)
        dispatch(getUsers())
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
        Mostrando desde {users?.length > 0 ? 1 : 0} a {users?.length} de {users?.length} usuarios
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
                <FaUsers className='card-icon-header'/>
                Usuarios
              </h2>
              <button type="button" className="btn btn-primary float-right" data-toggle="modal" onClick={() => dispatch(openModal())}>
                <FaPlus className='card-icon'/>
                Agregar nuevo usuario
              </button>
            </div>  
          </div>
        </div>
      </section>
      <section className="row table">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header vstack gap-3">
              <h2 className="card-title">
                Usuarios registrados
              </h2>
            </div>
            <div className='table-responsive'>
            <DataTable value={users} dataKey="id" paginator rows={rowsPerPage}  
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        globalFilter={globalFilter}
                        header={header} 
                        footer={currentPageReport}
                        className="p-datatable-custom">
                <Column field="name" header="Nombre" style={{ width: '25%' }} headerStyle={{ textAlign: 'center' }}></Column>
                <Column field="phone" header="Teléfono" style={{ width: '20%' }} headerStyle={{ textAlign: 'center' }}></Column>
                <Column field="isAdmin" header="Tipo de usuario" body={(rowData) => <span>{rowData.isAdmin ? 'Admin' : 'User'}</span>} style={{ width: '20%' }} headerClassName="header-column"></Column>
                <Column field="email" header="Correo electrónico" style={{ width: '25%' }} headerClassName="header-column"></Column>
                <Column header="Editar" body={editButton} style={{ width: '25%' }} headerClassName="header-column"></Column>
                <Column header="Eliminar" body={deleteButton} style={{ width: '25%' }} headerClassName="header-column"></Column>
            </DataTable>
            </div>
            {/*<div className='table-responsive'>
                <table className='userDatatable'>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Teléfono</th>
                            <th>Tipo de usuario</th>
                            <th>Correo electrónico</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>/*}
                        {/* Itera sobre la lista de usuarios y genera una fila para cada uno */}
                        {/*{users.map(user => (
                            <tr key={user._id}>
                                <td className='td-name'>{user.name}</td>
                                <td className='td-phone'>{user.phone}</td>
                                <td className='td-isAdmin'>{user.isAdmin ? 'Admin' : 'User'}</td>
                                <td className='td-email'>{user.email}</td>
                                <td>
                                    <button className='btn btn-primary'>
                                        <FaEdit />
                                        Editar
                                    </button>
                                </td>
                                <td>
                                    <button className='btn btn-danger'>
                                        <FaRegTrashAlt />
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>*/}
          </div>
        </div>
      </section>
        {isOpen && <Modal/>}
    </>
  )
}

export default Users