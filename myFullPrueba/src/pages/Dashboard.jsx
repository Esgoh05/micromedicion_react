import { FaUsers } from 'react-icons/fa';
//import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { getUsers, reset } from '../features/auth/authSlice'
import { useLocation } from 'react-router-dom'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext'; 

const Dashboard = () => {
  const { pathname } = useLocation();
  const {isOpen} = useSelector((store) => store.modal)
  const { users } = useSelector((store) => store.auth);
  const [globalFilter, setGlobalFilter] = useState(null); // Agrega el estado para el filtro global
  const [rowsPerPage] = useState(10);
  const dispatch = useDispatch();

  //const {user} = useSelector((state) => (state.auth))

  /*useEffect(() => {
    if(!user){
      navigate('/login')
    }
  }, [user, navigate])*/

  useEffect(() => {

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
                <FaUsers className='card-icon-header'/>
                Usuarios
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
              </DataTable>
            </div> 
          </div>
        </div>
      </section>
    </>
  )
}

export default Dashboard