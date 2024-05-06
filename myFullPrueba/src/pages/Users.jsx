import { FaUsers, FaPlus, FaRegTrashAlt, FaEdit } from 'react-icons/fa';
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { openModal } from '../features/modal/modalSlice';
import Modal from '../pages/Modal'
import { getUsers, reset } from '../features/auth/authSlice'
import { useLocation } from 'react-router-dom'

//import { DataTable } from 'primereact/datatable';
//import { Column } from 'primereact/column';

//import { Button } from 'primereact/button';
        
        
        
        

const Users = () => {
  const { pathname } = useLocation();
  const {isOpen} = useSelector((store) => store.modal)
  const { users } = useSelector((store) => store.auth);
  const dispatch = useDispatch();


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
            {/*<DataTable value={users} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="Nombre" style={{ width: '25%' }}></Column>
                <Column field="phone" header="Teléfono" style={{ width: '25%' }}></Column>
                <Column field="isAdmin" header="Tipo de usuario" style={{ width: '25%' }}></Column>
                <Column field="email" header="Correo electrónico" style={{ width: '25%' }}></Column>
                <Column field="Editar" header="Editar" editor={(options) => statusEditor(options)} style={{ width: '25%' }}></Column>
  </DataTable>*/}
            <div className='table-responsive'>
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
                    <tbody>
                        {/* Itera sobre la lista de usuarios y genera una fila para cada uno */}
                        {users.map(user => (
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
            </div>
          </div>
        </div>
      </section>
        {isOpen && <Modal/>}
    </>
  )
}

export default Users