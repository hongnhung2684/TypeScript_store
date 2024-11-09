import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  if (!user || user?.role !== 'admin') {
    return <h1>Ban khong co quyen vao trang nay</h1>
  }
  return (
    <div>
      <div className='row'>
        <div className=''>
          {/* <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/admin'>Dashboard</Link>
            </li>
            <li>
              <Link to='/admin'>Products</Link>
            </li>
            <li>
              <Link to='/admin'>Categories</Link>
            </li>
          </ul> */}
        </div>
        <div className=''>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
