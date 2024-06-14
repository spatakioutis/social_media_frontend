import './App.css'
import LoggedOut from './pages/LoggedOut'
import LoggedIn from './pages/LoggedIn.jsx'
import {data} from './assets/data.js'
import {useContext} from 'react'
import { TokenContext } from './contexts/TokenContext.jsx'

function App() {
	const user = data[0]

	const {token} = useContext(TokenContext)

	return (
		<>
		{token === '' 
		? <LoggedOut /> 
		: <LoggedIn />
		}
		</>
	)
}

export default App
