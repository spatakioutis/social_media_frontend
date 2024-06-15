import { useContext, createContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

	const [user, setUser] = useState(null)
	const [token, setToken] = useState(localStorage.getItem('token' || ''))
	const navigate = useNavigate()

	const logIn = async (data) => {
		const response = await axios.post('http://localhost:5000/login', {
			username: data.username,
			password: data.password
		})

		if (response.data) {
			setUser(response.data.user)
			setToken(response.data.token)
			localStorage.setItem('token', response.token)
			navigate('/home')
		}
	}

	const logOut = async () => {
		setUser(null)
		setToken('')
		localStorage.removeItem('token')
		navigate('login')
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