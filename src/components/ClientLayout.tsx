import { Outlet } from 'react-router-dom'
import Header from './Header'

const ClientLayout = () => {
  return (
    <div>
      <Header />
      <main id='container'>
        <Outlet />
      </main>
    </div>
  )
}

export default ClientLayout
