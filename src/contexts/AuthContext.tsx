import { createContext, useState } from 'react'
import { User } from '../interfaces/User'
import { useNavigate } from 'react-router-dom'
import instance from '../apis'

export type AuthContextType = {
  user: User | null
  onSubmit: (user: User, isLogin?: boolean) => void
  handleLogout: () => void
}
export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const nav = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const onSubmit = async (user: User, isLogin?: boolean) => {
    try {
      if (isLogin) {
        const { data } = await instance.post(`/login`, user)
        localStorage.setItem('accessToken', data.accessToken)
        localStorage.setItem('user', JSON.stringify(data.user))
        console.log(data)
        setUser(data.user)
        nav('/')
      } else {
        await instance.post(`/register`, user)
        nav('/login')
      }
    } catch (error: any) {
      console.log(error)
      alert(error.response.data || 'Error')
    }
  }
  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    localStorage.removeItem('cart')
    setUser(null)
    nav('/login')
  }
  return <AuthContext.Provider value={{ user, onSubmit, handleLogout }}>{children}</AuthContext.Provider>
}
export default AuthProvider
