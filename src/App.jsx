import { Navigate, BrowserRouter as Router, Route, Routes } from "react-router-dom"

import AuthProvider from './hooks/AuthProvider.jsx'
import PrivateRoute from './PrivateRoute.jsx'
import HomePage from './pages/HomePage.jsx'
import LoginPage from "./pages/LoginPage.jsx"
import RegisterPage from "./pages/RegisterPage.jsx"
import './App.css'
import UserProfilePage from "./pages/UserProfilePage.jsx"

const App = () => {
	return (
		<>
			<Router>
				<AuthProvider>
					<Routes>
						<Route 
							path='/'
							element={<Navigate to="/login" replace/>}
						/>
            			<Route 
							path="/login" 
							element={<LoginPage/>} 
						/>
						<Route
							path='/register'
							element={<RegisterPage/>}
						/>
            			<Route 
							element={<PrivateRoute />}
						>
              				<Route 
								path="/home" 
								element={<HomePage />} 
							/>
							<Route 
								path="/user" 
								element={<UserProfilePage />} 
							/>
            			</Route>
           			 {/* Other routes */}
         			 </Routes>
				</AuthProvider>
			</Router>
		</>
	)
}

export default App
