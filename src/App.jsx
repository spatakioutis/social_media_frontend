import './App.css'
import LoggedOut from './pages/LoggedOut'
import Post from './components/post/Post'
import Header from './components/header/Header'
import HomePage from './pages/HomePage.jsx'
import {data} from './assets/data.js'
import {useContext} from 'react'
import { TokenContext } from './TokenContext.jsx'

function App() {
	const user = data[0]

	const {token, removeToken} = useContext(TokenContext)
	
	return (
		<>
		{token === '' ? <LoggedOut /> : <HomePage />}
		</>
	)
}

export default App
