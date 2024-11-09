import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

const Header = () => {
  const { user, handleLogout } = useContext(AuthContext)

  return (
    <header>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        {user?.role === 'admin' && (
          <li>
            <Link to='/admin'>Admin</Link>
          </li>
        )}
        {user ? (
          <>
            <li>
              <button className='btn btn-danger' onClick={handleLogout}>
                Logout - {user.email}
              </button>
            </li>
            <li>
              <Link to={'/cart'} className='btn btn-warning'>
                Xem giỏ hàng
              </Link>
            </li>
            <li>
              <Link to={'/order'} className='btn btn-dark'>
                Xem đơn hàng
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/register'>Register</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}
export default Header
