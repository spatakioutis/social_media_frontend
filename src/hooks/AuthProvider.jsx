import { useContext, createContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
	const [token, setToken] = useState(localStorage.getItem('token') || '')
	const navigate = useNavigate()

	const logIn = async (data) => {
		const response = await axios.post('http://localhost:5000/login', {
			username: data.username,
			password: data.password
		})

		if (response.data) {
			setUser(response.data.user)
			setToken(response.data.token)
			localStorage.setItem('user', JSON.stringify(response.data.user))
			localStorage.setItem('token', response.data.token)
			navigate('/home')
		}
	}

	const logOut = async () => {
		setUser(null)
		setToken('')
		localStorage.removeItem('token')
		localStorage.removeItem('user')
		navigate('/login')
	}

	return (
		<AuthContext.Provider value={{ token, user, logIn, logOut }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider;

export const useAuth = () => {
	return useContext(AuthContext)
}