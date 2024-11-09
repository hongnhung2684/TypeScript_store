import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AuthContext } from '../contexts/AuthContext'
import { User } from './../interfaces/User'

type Props = {
  isLogin?: boolean
}

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(255)
})

const AuthForm = ({ isLogin }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<User>({
    resolver: zodResolver(userSchema)
  })
  const { onSubmit } = useContext(AuthContext)

  return (
    <div>
      <form onSubmit={handleSubmit((user) => onSubmit(user, isLogin))}>
        <h1>{isLogin ? 'Login' : 'Register'}</h1>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input className='form-control' type='email' {...register('email', { required: true })} />
          {errors.email && <span className='text-danger'>{errors.email.message}</span>}
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input className='form-control' type='password' {...register('password', { required: true })} />
          {errors.password && <span className='text-danger'>{errors.password.message}</span>}
        </div>
        <div className='mb-3'>
          <button className='btn btn-dark w-100'>{isLogin ? 'Login' : 'Register'}</button>
        </div>
      </form>
    </div>
  )
}
export default AuthForm
