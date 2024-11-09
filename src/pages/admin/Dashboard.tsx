import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ProductContext } from '../../contexts/ProductContext'

const Dashboard = () => {
  const { state, handleRemove } = useContext(ProductContext)
  return (
    <div className='container'>
      <h2 className='text-3xl font-bold'>Hello, Admin</h2>

      <Link to={`/admin/product-add`} className='btn btn-success'>
        Add new Product
      </Link>
      <table className=' table table-bordered table-striped text-center'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Image</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.products.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>
                <img width={200} src={item.thumbnail || 'Đang cập nhật'} />
              </td>
              <td>{item.description}</td>
              <td>
                <button onClick={() => handleRemove(Number(item.id))} className='btn btn-danger'>
                  Delete
                </button>
                <Link to={`/admin/product-edit/${item.id}`} className='btn btn-warning'>
                  Update
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Dashboard
