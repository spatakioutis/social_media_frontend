import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'

const useAxios = () => {
	const auth = useAuth()
  	const navigate = useNavigate()

  	const instance = axios.create()

  	instance.interceptors.request.use( 
		(config) => {
			const token = auth.token
			if (token) {
				config.headers.Authorization = `Bearer ${token}`
			}
      		return config
    	},
    	(error) => {
    		return Promise.reject(error)
    	}
  	)

  	instance.interceptors.response.use(
    	(response) => response,
    	(error) => {
      		if (error.response && error.response.status === 401) {
        		auth.logOut()
        		navigate('/login')
      		}
      		return Promise.reject(error)
    	}
  	)
	return instance
}

export { useAxios } 
